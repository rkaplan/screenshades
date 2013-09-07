(function(){
  "use strict";
  var mongoose = require("mongoose"),
      _        = require("underscore"),

      Schema   = mongoose.Schema,
      ObjectId = Schema.Types.ObjectId,

      validateEmail, validatePresenceOf;

  validatePresenceOf = function(value){
    return value && value.length;
  };

  validateEmail = function(value){
    var emailRegex = new RegExp(/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
    return emailRegex.test(value);
  };
  // schemas will go here

  var User = new Schema({
    email: {type: String, validate: [validateEmail, "A valid email is required."], index: {unique: true}},
    password: {type: String, validate: [validatePresenceOf, "A password is required."]},
    salt: String,
    firstName: String,
    lastName: String
  });

  var DeviceAuth = new Schema({
    user: ObjectId,
    auth: String
  });

  var Show = new Schema({
    name:     String,
    picture:  String
  });

  var Episode = new Schema({
    show: ObjectId,
    season: Number,
    episode: Number,
    name: String,
    corpus: String,
    description: String,
    netflixId: String
  });

  var ShowProgress = new Schema({
    owner: ObjectId,
    lastEpisode: ObjectId
  });

  exports.User         = mongoose.model("User", User);
  exports.DeviceAuth   = mongoose.model("DeviceAuth", DeviceAuth);
  exports.Show         = mongoose.model("Show", Show);
  exports.Episode      = mongoose.model("Episode", Episode);
  exports.ShowProgress = mongoose.model("ShowProgress", ShowProgress);
}());
