(function(){
  "use strict";

  var handler;

  handler = function(conf, level){
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
        if (req.session.valid){
          res.loggedIn = true;
        } else {
          res.loggedIn = false;
          req.session.flash = ["Sorry, please login below to do that."];
          return res.redirect("/login");
        }
        next();
      };
    }
  };

  module.exports = handler;
}());
