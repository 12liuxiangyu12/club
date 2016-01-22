"use strict";

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");

var config = require('../config.js');


var account = config.mysqlAcount.mockDB.account;
var database = config.mysqlAcount.mockDB.database.urlscheme;

var sequelize = new Sequelize(database, account.user, account.password, {
  host: account.host,
  port: account.port
});
var db        = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
