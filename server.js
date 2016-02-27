var io = require('socket.io');
var express = require("express");
var session = require('express-session');
var cookieParser = require('cookie-parser');

var config = require("./config.js");
var uuid = require("./common/uuid.js");

require('events').EventEmitter.defaultMaxListeners = Infinity;

var server_port = config.port;
var app = express();
app.set("views", __dirname + "/views");
app.set("view engine", "jade");
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(session({ secret: config.session_secret,
                        cookie: {maxAge:30*60*60*1000},
                        resave: true,
                        saveUninitialized: true
                      }));
app.use(uuid.handleCookie);
var server = app.listen(server_port);
var app_io = io.listen(server);
require("./common/socket.js").initSocket(app_io);
var web_router = require("./web_router.js");
app
  .use("/", web_router);
