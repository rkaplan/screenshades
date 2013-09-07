(function(){
  "use strict";

  var base = require("./base.js"),
      ViewClass = require("../views/AdminEpisode.js"),

      AdminEpisodeCtrl, _ptype;

  AdminEpisodeCtrl = function(schemas){
    this.schemas = schemas;

    this.payload = {title: ""};
    this._view   = new ViewClass();
  };

  _ptype = AdminEpisodeCtrl.prototype = base.getProto("std");
  _ptype._name = "AdminEpisode";

  _ptype.getEpisodes = function(showId, cb){
    this.schemas.Episode.find({show: showId}, function(err, episodes){
      if (err){ return cb(err) }

      return cb(null, episodes);
    });
  };

  _ptype.addEpisode = function(showId, episodeData, cb){
    var episode = new this.schemas.Episode({
      show: showId,
      season: episodeData.season,
      episode: episodeData.episode,
      corpus: episodeData.corpus,
      name: episodeData.name,
      description: episodeData.description,
      netflixId: episodeData.netflixId
    });
    episode.save(cb);
  };

  module.exports = AdminEpisodeCtrl;
}());
