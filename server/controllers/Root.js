(function(){
  "use strict";

  var base      = require("./base.js"),
      ViewClass = require("../views/Root.js"),

      RootCtrl, _ptype;

  RootCtrl = function(){
    this.payload = {title: "PennApps"};
    this._view   = new ViewClass();
  };

  _ptype = RootCtrl.prototype = base.getProto("std");
  _ptype._name = "Root";

  module.exports = RootCtrl;
}());
