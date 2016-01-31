"use strict";

var tableName = "website";

module.exports = function(sequelize, DataTypes) {
  var mockDB = sequelize.define(tableName, {
    url: {
      type: DataTypes.CHAR
    },
    pic: {
      type: DataTypes.CHAR
    },
    introduce: {
      type: DataTypes.TEXT
    },
    createAt: {
      type: DataTypes.DATE
    },
    like_count: {
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
