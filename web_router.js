var express = require("express");
var bodyParser = require('body-parser');
var session = require('express-session');

var api = require("./api/v1/route.js");
var index = require("./controllers/index.js");

var sessions = session({ secret: "abc",
                        cookie: {maxAge:15*24*60*60*1000},
                        resave: true,
                        saveUninitialized: true
                      });
  var router = express.Router();
  var urlencodedParser = bodyParser.urlencoded({ 
    extended: true,
    limit: "10mb"
  });
  var jsonParser = bodyParser.json( {limit: "10mb" })

  router.get("/", [index.index]);

module.exports = router;
