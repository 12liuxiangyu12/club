"use strict";

var tableName = "articleReply";

module.exports = function(sequelize, DataTypes) {
  var mockDB = sequelize.define(tableName, {
    author: {
      type: DataTypes.CHAR
    },
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
