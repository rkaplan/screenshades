(function(){
  "use strict";

  var _ = require("underscore"),
      handleGet,
      handlePost,
      handler, dispatch,

      ControllerClass = require("../controllers/AdminEpisode.js");

  handleGet = function(req, res, next){
    var control = new ControllerClass(req._schemas);

    var params = {};
    
    control.getEpisodes(req.params.id, function(err, episodes){
      if (err){ return res.json(500, {err: err}) }

      res.json({err: 0, episodes: episodes});
    });
  };

  handlePost = function(req, res, next){
    var episodeData = {
      show: req.body.show,
      season: req.body.season,
      episode: req.body.episode,
      corpus: req.body.corpus,
      name: req.body.name,
      description: req.body.description,
      netflixId: req.body.netflixId
    };
    var control = new ControllerClass(req._schemas);

    control.addEpisode(req.params.id, episodeData, function(err, episode){
      if (err){ return res.json(500, {err: err}); }

      res.json({err: 0, episode: episode});
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
