var winston = require("winston");
var fs = require("fs");

winston.emitErrs = true;
var logFile = ["info-file.log", "error-file.log"];
if(!fs.existsSync("./log/")){
  fs.mkdirSync("./log/");
}
logFile.forEach(function(filename){
  var path = "./log/" + filename;
  existOrCreate(path);
});
var logger = new winston.Logger({
  transports: [
    new (winston.transports.File)({
      name: "info-file",
      filename: "./log/info-file.log",
      level: "info"
    }),
    new (winston.transports.File)({
      name: "error-file",
      filename: "./log/error-file.log",
      handleExceptions: true,
      humanReadableUnhandledException: true,
      level: "error"
    })
  ],
  exitOnError: false
});

function existOrCreate(path){
  var exist = fs.existsSync(path);
  if(!exist){
    fs.openSync(path, "a");
  }
}

module.exports = logger;
