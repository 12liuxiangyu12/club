var util = require("../common/util.js");
var models  = require('../models');

var table = models.userLike;

var method = {
  insertUserLike: function(user_id, web_id){
    table.create({
      user_id: user_id,
      web_id: web_id
    }).then(function(result){
      console.log("insertUserLike success");
    });
  },
  getWebByUser: function(user_id, callback){
    table.findAll({ where: {
      user_id: user_id
    }}).then(function(result){
      callback(true, result);
    });
  },
  isUserLike: function(user_id, web_id, callback){
    table.findAll({ where: {
      user_id: user_id,
      web_id: web_id
    }}).then(function(result){
      callback(true, result);
    })
  },
  changeUserLikeStatus: function(user_id, web_id, callback){
    console.log("into change",user_id, web_id);
    table.findAll({ where: {
      user_id: user_id,
      web_id: web_id
    }}).then(function(result){
      console.log("find result");
      console.log(result.length);
      if(result.length > 0){
        console.log("减少like");
//        result.destory();
        result.forEach(function(data){
          console.log(data);
          console.log(data.id);
            //data.destory();
          table.destroy({ where: {id : data.id}});
        });
      }else{
        console.log("增加like");
        method.insertUserLike(user_id, web_id);
      }
      callback(true);
    })
  }
}

util.mixin(module.exports, method);
