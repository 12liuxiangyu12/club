"use strict";

var tableName = "userLike";

module.exports = function(sequelize, DataTypes) {
  var mockDB = sequelize.define(tableName, {
   web_id : {
      type: DataTypes.INTEGER
    },
   user_id : {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
    },
    freezeTableName: true,
    timestamps: false
  });

  return mockDB;
}
