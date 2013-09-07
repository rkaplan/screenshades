(function(){
  "use strict";
  /**
   * Module dependencies.
   */

  var express     = require('express'),
      routes      = require('./routes').routes,
      user        = require('./routes/user'),
      auth        = require("./app/auth.js"),
      http        = require('http'),
      hbs         = require("hbs"),
      schemas     = require("./app/schemas.js"),
      _           = require("underscore"),
      mongoose    = require("mongoose"),
      MongoStore  = require("connect-mongo")(express),
      conf        = require('nconf').argv().env().file({file: __dirname + '/config.json'}),
      path        = require('path'),

      setupHbs;

  var app = express();

  mongoose.connect(conf.get("mongo"));


  mongoose.connection.on("open", function(){
    setupHbs();
    var sessionStore = new MongoStore({db: mongoose.connection.db});
    // all environments
    app.set('port', conf.get("PORT"));
    app.set('views', __dirname + '/templates');
    app.set('view engine', 'hbs');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser(conf.get("secret")));
    app.use(express.session({
      store: sessionStore
    }));
    app.use(app.router);
    app.use(require('less-middleware')({ src: __dirname + '/public' }));
    app.use(express["static"](path.join(__dirname, 'public')));

    // development only
    if ('development' === app.get('env')) {
      app.use(express.errorHandler());
    }

    _.each(routes, function(route){
      var methods = route[5] || ["get"];
      methods.forEach(function(method){
        var params = [];

        if (route[2]){
          params.push(function(req, res, next){
            req._schemas = schemas;
            next();
          });
        }

        if (route[3]){
          params.push(function(req, res, next){
            req._conf = conf;
            next();
          });
        }

        params.push(auth(conf, schemas, route[4]));

        app[method](route[0], params, route[1]);
      });
    });


    http.createServer(app).listen(app.get('port'), function(){
      console.log('Express server listening on port ' + app.get('port'));
    });
  });

  setupHbs = function(){
    var blocks = {};

    hbs.registerHelper('extend', function(name, context) {
        var block = blocks[name];
        if (!block) {
            block = blocks[name] = [];
        }

        block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
    });

    hbs.registerHelper('block', function(name) {
        var val = (blocks[name] || []).join('\n');

        // clear the block
        blocks[name] = [];
        return val;
    });
  };
}());
