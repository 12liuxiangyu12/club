var redis = require('redis');
var Q = require('q');

var config = require('../config.js').redis_server;
var util = require('../common/util.js');

var destroy_time = 1 * 60 * 60 * 12;//mock数据储存12个小时
var redis_client = redis.createClient(config.port, config.account);
redis_client.on("error", function(err){
  console.log("into redis error");
  console.log(err);
});
//redis_client.auth(config.password, function(){
//  console.log("redis connected");
//});

function getMock(uidOrDpid, api){
  var deferred = Q.defer();
  var key = uidOrDpid + ":" + api;
  redis_client.hgetall(key, function(error, data){
    if (error) deferred.reject(error)
    else deferred.resolve(data);
  });
  return deferred.promise;
}

function checkMock(uidOrDpid, api){
  var deferred = Q.defer();
  var key = uidOrDpid + ":" + api;
  redis_client.hexists(key, "content", function(error, result){
    if (error) deferred.reject(error)
    else deferred.resolve(result);
  });
  return deferred.promise;
}
var redis_method = {
  redis_client: redis_client,
  setMock: function(uidOrDpid, api, content){
    var key = uidOrDpid + ":" + api;
    var time = new Date().getTime();
    var list = [key, "time", time, "content", content];
    redis_client.hmset.apply(redis_client, list);
    redis_client.EXPIRE(key, destroy_time);
  },
  isApiMocked: function(uid, dpid, api){
    var deferred = Q.defer();
    Q.all([
      checkMock(uid, api),
      checkMock(dpid, api)
    ]).done(function(values){
      deferred.resolve(values[0] || values[1]);
    });
    return deferred.promise;
  },
  destroy_single_mock: function(uidOrDpid, api){
    redis_client.DEL(uidOrDpid+":"+api);
  },
  destroy_all_mock: function(uidOrDpid){
    redis_client.keys(uidOrDpid+":*", function(err, keys){
      if(err) return console.log(err);
      keys.forEach(function(key){
        redis_client.DEL(key);
      });
    });
  },
  get_mock_content: function(uid, dpid, api){
    var deferred = Q.defer();
    Q.all([
      getMock(uid, api),
      getMock(dpid, api)
    ]).done(function(values){
      //if two mock datas is contained,use the last one
      if(values[0] && values[1]){
        if(values[0].time > values[1].time){
          if(!values[0].content) deferred.reject('no content');
          deferred.resolve(values[0].content);
        }else{
          if(!values[1].content) deferred.reject('no content');
          deferred.resolve(values[1].content);
        }
      }else{
        if(values[0]){
          if(!values[0].content) deferred.reject('no content');
          deferred.resolve(values[0].content);
        }else{
          if(!values[1]) return deferred.reject('no content');
          if(!values[1].hasOwnProperty("content")) return deferred.reject('no content');
          deferred.resolve(values[1].content);
        }
      }
      deferred.resolve(values[0] || values[1]);
    });
    return deferred.promise;
  }
}
//redis_method.destroy_all_mock("liuxiangyu");
//redis_method.setMock(["liuxiangyu", "api", "seachdealgn.bin", "content", "content"]);
//redis_method.isApiMocked("xiangyu", "xiangyu", "name").then(console.log,console.error);
//redis_method.destroy_mock("liuxiangyu");
//redis_method.setMock("auid", "seachdealgn", "neirong0");
//redis_method.setMock("adpid", "seachdealgn", "neirong1");
//redis_method.get_mock_content("auid", "adpid", "seachdealgn").then(function(data){
//});
util.mixin(module.exports, redis_method);
