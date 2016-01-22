var URL = require("url");

var current_io = {};
module.exports.initSocket = function(io){
  current_io = io;
  io.sockets.on("connection", function(socket){
    console.log("socket connect");
  });
}

module.exports.io = function getIo(){
  return current_io;
}

