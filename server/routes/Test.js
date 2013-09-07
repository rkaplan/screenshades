(function(){
  "use strict";

  module.exports = function(req, res, next){
    console.log("looking up", req.session.userId);
    req._schemas.User.findOne({_id: req.session.userId}, function(err, user){
      if (err || !user){ return res.json(500, err) }

      res.json({
        err: 0,
        msg: "Authed, " + user.firstName
      });
    });
  };
}());
