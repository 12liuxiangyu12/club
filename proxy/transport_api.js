
var models  = require('../models');
var api_db = require('./api.js');

models.new_mock_data.findAll().then(
  function(data){
    for(var i in data){
      var insertData = {};
      insertData.case_id = data[i]["id"];
      insertData.api = data[i]["api"];
      insertData.content = data[i]["mockcontent"];
      api_db.addApi(insertData, function(isSuccess, result){
        console.log(isSuccess);
      });
    }
  }
)
