"use strict";

var tableName = "user";

module.exports = function(sequelize, DataTypes) {
  var mockDB = sequelize.define(tableName, {
    name: {
      type: DataTypes.CHAR
    },
    email: {
      type: DataTypes.TEXT
    },
    createAt: {
      type: DataTypes.DATE
    },
    password: {
      type: DataTypes.CHAR
    },
    level: {
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
