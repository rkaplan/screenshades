(function(){
  "use strict";
  
  var base = require("./base.js");


  var AdminEpisodeView, _ptype;

  AdminEpisodeView = function(){};

  _ptype = AdminEpisodeView.prototype = base.getProto("std");
  _ptype._view_name = "AdminEpisodeView";
  _ptype._template  = "adminEpisode.jade";

  module.exports = AdminEpisodeView;
}());
