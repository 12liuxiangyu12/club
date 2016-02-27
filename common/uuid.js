var uuid = require('node-uuid');

function generate_uuid(){
  return uuid.v4();
}

function handleCookie(req, res, next){
  var cookie = req.session;
  if(cookie){
    if(cookie.uid){
      next();
      return;
    }
  }
  var id = generate_uuid();
  req.session.uid = id;
  next();
}

function getUid(req){
  return req.session.uid;
}

module.exports.handleCookie = handleCookie;
module.exports.getUid = getUid;
