"use strict";

var tableName = "articleType";

module.exports = function(sequelize, DataTypes) {
  var mockDB = sequelize.define(tableName, {
    typeName: {
      type: DataTypes.CHAR
    }
  }, {
    classMethods: {
    },
    freezeTableName: true,
    timestamps: false
  });

  return mockDB;
}
