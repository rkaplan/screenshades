(function(){
  "use strict";

  var handler, checkAuth;

  handler = function(conf, schemas, level){
    if (level === -1){
      return function(req, res, next){
        if (req.session.valid){
          res.loggedIn = true;
          return res.redirect("/");
        } else {
          res.loggedIn = false;
        }
        next();
      };
    }
    if (level === 0){
      return function(req, res, next){
        if (req.session.valid){
          res.loggedIn = true;
        } else {
          res.loggedIn = false;
        }
        next();
      };
    } else if (level === 1){
      return function(req, res, next){
        var user = checkAuth(schemas, req.get("X-SHADES-AUTH"), function(err, user){
          if (err){ return res.json(401, {err: err}) }

          req.session.userId = user;
          next();
        });
      };
    }
  };

  checkAuth = function(schemas, authString, cb){
    schemas.DeviceAuth.findOne({auth: authString}, function(err, deviceAuth){
      if (err){
        console.log(err);
        return cb({status: 401});
      }
      return cb(null, deviceAuth.user);
    });
  };

  module.exports = handler;
}());
