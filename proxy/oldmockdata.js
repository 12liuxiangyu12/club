var models  = require('../models');
var fs = require('fs');
var mockProxy = require('./mock.js'); 

var project={"1":"主App-平台","2":"主App-团购","3":"主App-预定","4":"主App-电影","5":"主App-外卖","6":"主App-卡包","7":"主App-丽人","17":"主App-优惠","11":"主App-结婚","18":"主App-酒店","13":"主App-闪惠","15":"主App-搜索","16":"主App-旅游","14":"主App-UGC"};
function findAll(callback){
  models.mockdata.findAll().then(
      function(data){
        callback(true, data);
      }
  );
}

findAll(function(isSuccess,data){
  for(var i in data){
    console.log(data[i]["name"]);
    text = fs.readFileSync('.'+data[i]["path"]);
    var scheme = {}
    scheme.name=data[i]["name"]
    scheme.department = project[data[i]["group"]]
    scheme.api = data[i]["api"]
    scheme.urlscheme = data[i]["urlscheme"]
    scheme.version = data[i]["version"]
    scheme.mockcontent = text.toString();
    mockProxy.addScheme(scheme, function(isSuccess, data){
      console.log(isSuccess);
    });
//    console.log(text.toString());
  }
});
