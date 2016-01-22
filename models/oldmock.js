"use strict";

var tableName = "mockdata";

module.exports = function(sequelize, DataTypes) {
  var mockDB = sequelize.define(tableName, {
    name: {
      type: DataTypes.TEXT
    },
    api: {
      type: DataTypes.TEXT
    },
    urlscheme: {
      type: DataTypes.TEXT
    },
    group: {
      type: DataTypes.INTEGER
    },
    path: {
      type: DataTypes.TEXT
    }
  }, {
    classMethods: {
    },

    timestamps: false
  });

  return mockDB;
}
