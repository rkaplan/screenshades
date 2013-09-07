(function(){
  "use strict";
  
  var base = require("./base.js");


  var SignupView, _ptype;

  SignupView = function(){};

  _ptype = SignupView.prototype = base.getProto("std");
  _ptype._view_name = "SignupView";
  _ptype._template  = "signup.hbs";

  module.exports = SignupView;
}());
