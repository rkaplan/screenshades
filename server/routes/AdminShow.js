(function(){
  "use strict";

  var _ = require("underscore"),
      handleGet,
      handlePost,
      handler, dispatch,

      ControllerClass = require("../controllers/AdminShow.js");

  handleGet = function(req, res, next){
    var control = new ControllerClass(req._schemas);

    var params = {};
    
    control.getShows(function(err, shows){
      if (err){ return res.json(500, {err: err}) }

      return res.json({err: 0, shows: shows});
    });
  };

  handlePost = function(req, res, next){
    var showData = {
      name: req.body.name,
      picture: req.body.picture
    };
    var control = new ControllerClass(req._schemas);
    
    control.addShow(showData, function(err, show){
      if (err){ return res.json(err, 500) }

      res.json({err: 0, show: show});
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
