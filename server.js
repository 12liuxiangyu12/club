var io = require('socket.io');
var express = require("express");

var config = require("./config.js");

require('events').EventEmitter.defaultMaxListeners = Infinity;

var server_port = config.port;
var app = express();
app.set("views", __dirname + "/views");
app.set("view engine", "jade");
app.use(express.static(__dirname + '/public'));
var server = app.listen(server_port);
var app_io = io.listen(server);
require("./common/socket.js").initSocket(app_io);
var web_router = require("./web_router.js");
app
  .use("/", web_router);
