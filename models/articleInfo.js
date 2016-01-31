"use strict";

var tableName = "articleInfo";

module.exports = function(sequelize, DataTypes) {
  var mockDB = sequelize.define(tableName, {
    content: {
      type: DataTypes.TEXT
    },
    createAt: {
      type: DataTypes.DATE
    },
    articleID: {
      type: DataTypes.INTEGER
    }
  }, {
    classMethods: {
    },
    freezeTableName: true,
    timestamps: false
  });

  return mockDB;
}
