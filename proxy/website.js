var util = require("../common/util.js");
var models  = require('../models');

var website = models.website;

var method = {
  getRandomWeb: function(callback){
    website.findAll({ where: {
      url: { ne: null },
      pic: { ne: null }
      } }).then(function(result){
      len = result.length;
      console.log(len);
      if(len > 0){
        var index = Math.ceil(Math.random()*len) - 1;
        console.log(index);
      }
      typeof index !== 'undefined' ? callback(true, result[index]) : callback(false, "");
    });
  },
  setWeb: function(web){
    var url = web.url;
    var introduce = web.introduce;
    var like_count = 0;
    var time = new Date();
    website.create({
      url: url,
      introduce: introduce,
      like_count: 0,
      createAt: time
    }).then(function(web){
      console.log('add website');
    });
  },
  getNoPicWeb: function(callback){
    website.findAll({ where: { pic: null } }).then(function(result){
      console.log("get result");
      callback(true, result);
    });
  },
  setPicForWeb: function(id, path){
    var attr = { pic: path }
    website.find({ where: {
      id: id
    }}).then(function(web){
      web.updateAttributes(attr);
    });
  }
}

util.mixin(module.exports, method);
