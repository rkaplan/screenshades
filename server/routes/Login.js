(function(){
  "use strict";

  var _ = require("underscore"),
      handleGet,
      handlePost,
      handler, dispatch,

      ControllerClass = require("../controllers/Login.js");

  handleGet = function(req, res, next){
    var control = new ControllerClass();

    var params = {};

    control.renderView(res, params);
  };

  handlePost = function(req, res, next){
    var userData = {
      email: req.body.email,
      password: req.body.password,
      deviceId: req.body.deviceId
    };

    var control =  new ControllerClass(req._schemas, req._conf);
    control.loginUser(userData, function(err){
      if (err){
        return res.json({err: err}, 500);
      }
      return res.json({err: 0});
    });
  };
  
  dispatch = {GET: handleGet, POST: handlePost};
  handler = function(req, res, next){
    if (_.has(dispatch, req.method)){
      return dispatch[req.method](req, res, next);
    }

    return next(405);
  };
  
  module.exports = handler;
}());
