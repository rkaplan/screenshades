(function(){
  "use strict";
  
  var base = require("./base.js");


  var AdminShowView, _ptype;

  AdminShowView = function(){};

  _ptype = AdminShowView.prototype = base.getProto("std");
  _ptype._view_name = "AdminShowView";
  _ptype._template  = "adminShow.jade";

  module.exports = AdminShowView;
}());
