var models  = require('../models');
var api = require('./api.js');

var Q = require('q');

function deleteSchemeById(id, callback){
  models.new_mock_data.find({ where: { id: id } }).then(function(result){
    if(result){
      result.destroy().then(function(destroyresult){
        api.deleteApi(id, function(isSuccess,rs){
          callback(true, destroyresult);
        });
      });
    }else{
      callback(false, result);
    }
  });
}

function clickScheme(id, callback){
  var time = new Date();
  var Data = {
    clicktime: time
  }
  models.new_mock_data.find({ where: { id: id } }).then(function(result){
    if(result){
      Data.count = 1 + result.count;
      models.mockapis.findAll({ where: { case_id: id } }).then(function(apiresult){
        if(apiresult){
          result.updateAttributes(Data).then(function(updateresult){
            updateresult.apiresult = apiresult;
            callback(true, updateresult);
          });
        }else{
          callback(false, result);
        }
      });
    }
  });

}

function addApiAsync(case_id, content){
  var deferred = Q.defer();
  var insertData = {};
  insertData.case_id = case_id;
  insertData.api = content.api;
  insertData.content = content.content
  api.addApi(insertData, function(isSuccess, insert_result){
    deferred.resolve(isSuccess);
  });
  return deferred.promise;
}

function updateScheme(scheme){
  var deferred = Q.defer();
  var time = new Date();
  var Data = {
    name: scheme.name, 
    department: scheme.department,
    api: scheme.api,
    urlscheme: scheme.urlscheme,
    version: scheme.version,
    mockcontent: scheme.mockcontent,
    updatetime: time,
  }
  var api_list = scheme.api_list;
  models.new_mock_data.find({ where: { name: scheme.name } }).then(function(result){
    if(result){
      result.updateAttributes(Data).then(function(updateresult){
        var case_id = updateresult.id;
        api.deleteApi(case_id, function(isSuccess,rs){
          api_list = api_list || [];
          if(api_list){
            var promise_list = [];
            api_list.forEach(function(content){
              promise_list.push(addApiAsync(case_id, content));
            });
            Q.all(promise_list).done(function(values){
              deferred.resolve(updateresult);
            });
          }
        });
      });
    }
  });
  return deferred.promise;
}

function addScheme(scheme, callback){
  var time = new Date();
  var insertData = {
    name: scheme.name, 
    department: scheme.department,
    api: scheme.api,
    urlscheme: scheme.urlscheme,
    count: 0,
    version: scheme.version,
    mockcontent: scheme.mockcontent,
    updatetime: time,
    editor: scheme.editor,
    staff_id: scheme.staff_id
  }
  var api_list = scheme.api_list;
  models.new_mock_data.create(insertData).then(function(newScheme){
    var case_id = newScheme.id;
    if(api_list){
      api_list.forEach(function(content){
        var insertData = {};
        insertData.case_id = case_id;
        insertData.api = content.api;
        insertData.content = content.content
        api.addApi(insertData, function(isSuccess, insert_result){
          if(isSuccess){
            callback(true, newScheme);
          }else{
            callback(false, newScheme);
          }
        });
      });
    }else{
      callback(true, newScheme);
    }
  }).catch(function(error){
      callback(false, error.name);
  });
}

function createOrUpdateScheme(scheme, callback){
  if(!scheme.name){
    callback(false, "please insert name");
    return;
  }
  models.new_mock_data.find({ where: { name: scheme.name } }).then(function(result){
    if(!result){
      addScheme(scheme, callback);
    }else{
      updateScheme(scheme).then(function(values){
        callback(true, values);
      });;
    }
  });
}

function findSchemeById(id,callback){
  models.new_mock_data.find({ where: { id: id } }).
    then(function(result){
      if(!result){
        callback(false, "can't find scheme");
        return;
      }
      models.mockapis.findAll({ where: { case_id: id } }).then(function(apiresult){
        if(apiresult){
          result.apiresult = apiresult;
          callback(true, result);
        }else{
          callback(false, result);
        }
      });
    });
}
function findAll(callback){
  models.new_mock_data.findAll().then(
      function(data){
        callback(true, data);
      }
  );
}




var scheme = {}
scheme["name"] = "111这是测试用例名字11";
scheme["api"] = "/sSearchgn.bin";
scheme["mockcontent"] = "dsadas";
///////////test
//createOrUpdateScheme(scheme, function(istrue, scheme){
//  console.log(istrue, scheme);
//});
//var fs = require('fs');
//var text = fs.readFileSync('../test.json').toString();
//console.log(text);
//scheme["mockcontent"] = text;
//addScheme(scheme, function(newScheme){
//  console.log(newScheme);
//});
//updateScheme(scheme, function(newScheme){
//  console.log(newScheme);
//});
//clickScheme(scheme, function(newScheme){
//  console.log(newScheme);
//});
//deleteScheme(scheme, function(newScheme){
//  console.log(newScheme);
//});

module.exports.findAll = findAll;
module.exports.addScheme = addScheme;
module.exports.createOrUpdateScheme = createOrUpdateScheme;
module.exports.clickScheme = clickScheme;
module.exports.deleteSchemeById = deleteSchemeById;
module.exports.updateScheme = updateScheme;
module.exports.findSchemeById = findSchemeById;
