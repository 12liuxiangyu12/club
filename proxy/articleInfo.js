var util = require("../common/util.js");
var models  = require('../models');

var articleInfo = models.articleInfo;

var method = {
  getArticleByType: function(type){
    articleInfo.find({
      type: type
    });
  }
}
