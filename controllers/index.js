var articleType = require("../proxy/articleType.js");

exports.index = function(req, res, next){
//    articleType.getAllType(function(isSuccess,result){
//      console.log('result', result);
//      res.render("dashboard/index",
//          {
//            tabs: result
//          });
//    });
    res.render("dashboard/index",
          {
          });

}

exports.add_web = function(req, res, next){
  res.render("dashboard/add",
        {
        });

}
