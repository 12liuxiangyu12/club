var util = require("../common/util.js");
var models  = require('../models');

var articleType = models.articleType;

var method = {
  getAllType: function(callback){
    articleType.findAll().then(function(result){
      callback(true, result);
    });
  }
}

util.mixin(module.exports, method);
