var URL = require('url');



var handler = {}

var router = function(req, res, next){
  var User = util.getUserInfo(req);
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
