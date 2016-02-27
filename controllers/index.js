var articleType = require("../proxy/articleType.js");
var website_db = require('../proxy/website.js');
var userLike_db = require("../proxy/userLike.js");
var logger = require("../common/logger.js");
var uid = require("../common/uuid.js");

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
  var user_id = uid.getUid(req);
  website_db.getWebByTimestamp(timestamp, function(isSuccess, result){
    var web_id = result.id;
    userLike_db.isUserLike(user_id, web_id, function(isSuccess, likeornot){
      var like = likeornot.length > 0 ? true : false;
      website_db.getRandomWeb(function(isSuccess, next){
        if(isSuccess){
          var nextUrl = "/article/" + next.timestamp;
          logger.log("info", "article", result.timestamp)
          res.render("dashboard/index",
                {
                  title: result.title,
                  web: result,
                  timestamp: result.timestamp,
                  next: nextUrl,
                  isUserLike: like
                });
        }
      });
    });
  });
}

exports.add_web = function(req, res, next){
  res.render("dashboard/add",
        {
        });

}

exports.redirect = function(req, res, next){
  var timestamp = req.params.timestamp;
  website_db.getWebByTimestamp(timestamp, function(isSuccess, result){
    if(isSuccess){
      logger.log("info", "redirect", result.url);
      res.redirect(result.url);
    }
  });
}

exports.like = function(req, res, next){
  var user_id = uid.getUid(req);
  var timestamp = req.params.timestamp;
  website_db.getWebByTimestamp(timestamp, function(isSuccess, result){
    if(isSuccess){
      var web_id = result.id;
      userLike_db.changeUserLikeStatus(user_id, web_id, function(isSuccess){
        res.redirect("/article/"+timestamp);
      });
    }
  });
}
