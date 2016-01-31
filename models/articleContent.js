"use strict";

var tableName = "articleContent";

module.exports = function(sequelize, DataTypes) {
  var mockDB = sequelize.define(tableName, {
    createAt: {
      type: DataTypes.DATE
    },
    lastCommentTime: {
      type: DataTypes.DATE
    },
    author: {
      type: DataTypes.CHAR
    },
    lastCommentPeople: {
      type: DataTypes.CHAR
    },
    type: {
      type: DataTypes.INTEGER
    },
    replyCount: {
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
