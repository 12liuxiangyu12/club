"use strict";

var tableName = "mockapis";


module.exports = function(sequelize, DataTypes) {
  var mockDB = sequelize.define(tableName, {
    case_id: {
      type: DataTypes.INTEGER
    },
    api: {
      type: DataTypes.TEXT
    },
    content: {
      type: DataTypes.TEXT
    },
    updatetime: {
      type: DataTypes.DATE
    },
  }, {
    classMethods: {
    },

    timestamps: false
  });

  return mockDB;
}
