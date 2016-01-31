var URL = require('url');
var util = require('../../common/util.js');

var website_db = require('../../proxy/website.js');

var handler = {}

handler['setPicForWeb'] = function(req, res, next){
  var url = URL.parse(req.url);
  var query = req.query;
  if(!query.id || !query.path){
    res.end("wrong params");
    return;
  }
  website_db.setPicForWeb(query.id, query.path);
  res.json({ result: "ok" });
}

handler['getNoPicWeb'] = function(req, res, next){
  var js = [];
  website_db.getNoPicWeb(function(isSuccess, result){
    console.log(result);
    res.json(result);
  });
}

handler['addWeb'] = function(req, res, next){
  if(req.method != "POST"){
    var data = { isSuccess: false, content: "please use POST" }
    res.json(data);
    return;
  }
  var postData = req.body;
  var url = postData.url;
  var introduce = postData.introduce;
  var web = {
    url: url,
    introduce: introduce
  };
  website_db.setWeb(web);
  res.redirect("/addWeb");
}

handler['getRandomWeb'] = function(req, res, next){
  website_db.getRandomWeb(function(isSuccess, web){
    var web_temp = {
      url: "",
      introduce: "",
      pic: ""
    }
    if(isSuccess){
      console.log(web);
      web_temp.url = web.url;
      web_temp.introduce = web.introduce;
      web_temp.pic = web.pic;
    }
    res.json(web_temp);
  });
}

var router = function(req, res, next){
  //var User = util.getUserInfo(req);
  var url = URL.parse(req.url);
  var pathname = url.pathname.substring("/api/vi/".length);
  if(handler[pathname]){
    handler[pathname](req, res, next);
  }else{
    var data = { isSuccess: false, result: "can't find api" }
    data = JSON.stringify(data);
    res.end(data);
  }
}

module.exports = router;
