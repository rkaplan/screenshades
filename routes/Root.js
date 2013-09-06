(function(){
  "use strict";

  var _               = require("underscore"),
      ControllerClass = require("../controllers/Root.js"),

      handler, dispatch,
      handleGet;

  handleGet = function(req, res, next){
    var control = new ControllerClass();
    
    var params = {};
    control.renderView(res, params);
  };


  dispatch = {GET: handleGet};
  handler = function(req, res, next){
    if (_.has(dispatch, req.method)){
      return dispatch[req.method](res, res, next);
    }
    
    return next(405);
  };

  module.exports = handler;
}());
