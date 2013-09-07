(function(){
  "use strict";

  var base      = require("./base.js"),
      crypto    = require("crypto"),
      ViewClass = require("../views/Login.js"),

      LoginCtrl, _ptype,
      hashPassword;

  LoginCtrl = function(schemas, conf){
    this.schemas = schemas;
    this.conf    = conf;

    this.payload = {title: ""};
    this._view   = new ViewClass();
  };

  _ptype = LoginCtrl.prototype = base.getProto("std");
  _ptype._name = "Login";

  _ptype.loginUser = function(userData, cb){
    var self = this;
    // get the user
    self.schemas.User.findOne({email: userData.email}, function(err, user){
      if (err || !user){
        console.log(err);
        
        return cb({msg: "Error finding user"});
      }
      
      // hash the password
      hashPassword(userData.password, user.salt, self, function(err, password){
        if (password.pass === user.password){
          // correct. Add the device id
          var deviceAuth = new self.schemas.DeviceAuth({
            user: user._id,
            auth: userData.deviceId
          });
          deviceAuth.save(cb);
        } else {
          return cb({status: 401});
        }
      });
    });
  };

  hashPassword = function(password, salt, self, cb){
    // hash the password
    crypto.pbkdf2(password, salt, parseInt(self.conf.get("crypto:iterations"), 10), parseInt(self.conf.get("crypto:keylen"), 10), function(err, result){
      if (err){ return cb(err) }

      cb(false, {salt: salt, pass: new Buffer(result, "binary").toString("hex")});
    });
  };

  module.exports = LoginCtrl;
}());
