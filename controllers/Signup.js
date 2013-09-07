(function(){
  "use strict";

  var base       = require("./base.js"),
      crypto     = require("crypto"),
      ViewClass  = require("../views/Signup.js"),

      SignupCtrl, _ptype,
      setupPassword, generateSalt;

  SignupCtrl = function(schemas, conf){
    this.schemas = schemas;
    this.conf    = conf;

    this.payload = {title: ""};
    this._view   = new ViewClass();
  };

  _ptype = SignupCtrl.prototype = base.getProto("std");
  _ptype._name = "Signup";

  _ptype.createUser = function(userData, cb){
    var self = this;
    setupPassword(userData, self, function(err, password){
      if (err){ return cb(err) }
      console.log("got hash", password);
      var user = new self.schemas.User({
        email: userData.email,
        password: password.pass,
        salt: password.salt,
        firstName: userData.firstName,
        lastName: userData.lastName
      });
      user.save(cb);
    });
  };

  setupPassword = function(userData, self, cb){
    // generate a salt
    generateSalt(function(err, salt){
      if (err){ return cb(err) }

      // hash the password
      crypto.pbkdf2(userData.password, salt, parseInt(self.conf.get("crypto:iterations"), 10), parseInt(self.conf.get("crypto:keylen"), 10), function(err, result){
        if (err){ return cb(err) }

        cb(false, {salt: salt, pass: new Buffer(result, "binary").toString("hex")});
      });
    });
  };

  generateSalt = function(cb){
    crypto.randomBytes(32, function(err, salt){
      if (err){
        return cb(err);
      }

      cb(false, new Buffer(salt, "binary").toString("hex"));
    });
  };

  module.exports = SignupCtrl;
}());
