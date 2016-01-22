var request = require("request");
var fs = require("fs");

var localScheme;
var text = fs.readFileSync('./proxy/localScheme.txt').toString();
parseJson(text);
var url = "http://m.tool.dp/models/getallscheme";
var time = 1000 * 60 * 60;
refreshData();
setInterval(refreshData,time);

function refreshData(){
  request(url, function(error, response, body){
  //  console.log(body);
    parseJson(body);
  });
}

function parseJson(data){
  var jsonData = JSON.parse(data);
  localScheme = jsonData;
}

function zipString(str, num){
  if(!str) return;
  if(str.length>num){
    return str.substr(0, num) + "...";
  }
  return str;
}

function getAll(){
  var result = [];
  localScheme.forEach(function(data){
    if(data.examples){
      data.examples.forEach(function(scheme){
        scheme.category = data.category || "";
        scheme.beginVer = data.beginVer || "";
        scheme.endVer = data.endVer || "";
        scheme.zip_exampel = zipString(scheme.exampel,80);
        scheme.desc = zipString(scheme.desc,80);
        scheme.scheme_value = encodeURIComponent(scheme.exampel);
        result.push(scheme);
      });
    }
  });
  return result;
}
module.exports.allscheme = getAll;
