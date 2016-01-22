"use strict";

var tableName = "new_mock_data";

module.exports = function(sequelize, DataTypes) {
  var mockDB = sequelize.define(tableName, {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: { name: "name", msg: "name is already used" }
    },
    department: {
      type: DataTypes.TEXT
    },
    api: {
      type: DataTypes.TEXT
    },
    urlscheme: {
      type: DataTypes.TEXT
    },
    mockcontent: {
      type: DataTypes.TEXT
    },
    version: {
      type: DataTypes.TEXT
    },
    editor: {
      type: DataTypes.TEXT
    },
    staff_id: {
      type: DataTypes.TEXT
    },
    updatetime: {
      type: DataTypes.DATE
    },
    clicktime: {
      type: DataTypes.DATE
    },
    count: {
      type: DataTypes.INTEGER
    }
  }, {
    classMethods: {
    },

    timestamps: false
  });

  return mockDB;
}
