(function(){
  "use strict";

  var Routes = {
    Root: require("./Root.js"),
    Signup: require("./Signup.js"),
    Login: require("./Login.js"),
    Test: require("./Test.js")
  };

  // routes, function, mongo, conf, auth, methods
  var routeList = [
    ["/",       Routes.Root,   0, 0, 0,  ["get"         ]],
    ["/signup", Routes.Signup, 1, 1, -1, ["get", "post" ]],
    ["/login",  Routes.Login,  1, 1, 0,  ["get", "post" ]],
    ["/test",   Routes.Test,   1, 0, 1,  ["get"]]
  ];

  exports.routes = routeList;
}());
