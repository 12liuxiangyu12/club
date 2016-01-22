var models  = require('../models');

function addApi(object, callback){
  var time = new Date();
  var insertData = {
    case_id: object.case_id,
    api: object.api,
    content: object.content,
    updatetime: time
  }
  models.mockapis.create(insertData).then(function(insert_result){
    callback(true, insert_result);
  });
}

function deleteApi(case_id, callback){
  models.mockapis.destroy({ where: { case_id: case_id },
  limit: 5000 }).then(function(destroyresult){
    callback(true, destroyresult);
  });
}

function findApiByCaseId(case_id, callback){
  models.mockapis.findAll({ where: { case_id: case_id } }).then(function(result){
    if(result){
      callback(true, result);
    }else{
      callback(false, result);
    }
  });
}
module.exports.findApiByCaseId = findApiByCaseId
module.exports.deleteApi = deleteApi;
module.exports.addApi = addApi;
