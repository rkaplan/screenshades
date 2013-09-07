(function(){
  "use strict";

  var Routes = {
    Root: require("./Root.js"),
    Signup: require("./Signup.js"),
    Login: require("./Login.js")  ,
    AdminShow: require("./AdminShow.js")  ,
    AdminEpisode: require("./AdminEpisode.js")
  };

  // routes, function, mongo, conf, auth, methods
  var routeList = [
    ["/",       Routes.Root,   0, 0, 0,  ["get"         ]],
    ["/signup", Routes.Signup, 1, 1, -1, ["get", "post" ]],
    ["/login",  Routes.Login,  1, 1, 0,  ["get", "post" ]],

    ["/a/show",              Routes.AdminShow,    1, 1, 2,  ["get", "post" ]],
    ["/a/show/:id/episode",  Routes.AdminEpisode, 1, 0, 2,  ["get", "post" ]]
  ];

  exports.routes = routeList;
}());
