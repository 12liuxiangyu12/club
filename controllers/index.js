var articleType = require("../proxy/articleType.js");
var website_db = require('../proxy/website.js');

exports.index = function(req, res, next){
//    articleType.getAllType(function(isSuccess,result){
//      console.log('result', result);
//      res.render("dashboard/index",
//          {
//            tabs: result
//          });
//    });
  website_db.getRandomWeb(function(isSuccess, web){
    if(isSuccess){
      var timestamp = web.timestamp;
      res.redirect("/article/" + timestamp);
    }
  });
}

exports.article = function(req, res, next){
  var timestamp = req.params.timestamp
  website_db.getWebByTimestamp(timestamp, function(isSuccess, result){
    website_db.getRandomWeb(function(isSuccess, next){
      if(isSuccess){
        var nextUrl = "/article/" + next.timestamp;
        res.render("dashboard/index",
              {
                title: result.title,
                web: result,
                next: nextUrl
              });
      }
    });
  });
}
exports.add_web = function(req, res, next){
  res.render("dashboard/add",
        {
        });

}
