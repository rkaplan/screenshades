(function(){
  "use strict";

  var Routes = {
    Root: require("./Root.js")
  };

  // routes, function, mongo, conf, methods
  var routeList = [
    ["/", Routes.Root, 0, 0, ["get"]]
  ];

  exports.routes = routeList;
}());
