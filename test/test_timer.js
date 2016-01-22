var util = require("./../util.js");

var devicelist={};
var project = function(){
}
	project.prototype.onDestroy = function(){
		console.log("onDestroy")
	}
	project.prototype.onCreate = function(){
		console.log("onCreate")
	}
	project.prototype.delaytime = 2000;
	var a =new project()
	console.log(a.delaytime);
util.setTimer.apply(a,[devicelist,{id:"hello"}]);
util.setTimer.apply(a,[devicelist,{id:"hello"}]);
util.setTimer.apply(a,[devicelist,{id:"world"}]);
console.log(devicelist);
util.setTimer.apply(a,[devicelist,{id:"world"}]);
util.setTimer.apply(a,[devicelist,{id:"hello"}]);
  