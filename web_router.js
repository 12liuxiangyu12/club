var express = require("express");
var bodyParser = require('body-parser');
var session = require('express-session');
var config = require('./config.js');

var api = require("./api/v1/route.js");
var index = require("./controllers/index.js");
var article = require("./controllers/article.js");

var sessions = session({ secret: config.session_secret,
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

router.get(["/","tab"], [index.index]);

router.get(["/add_web"], [index.add_web]);

router.get("/t", [article.index]);


router.all("/api/v1/*", [urlencodedParser, jsonParser, api]);
module.exports = router;
