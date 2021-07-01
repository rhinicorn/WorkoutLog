const {DataTypes} = require('sequelize');
const db = require('../db');

const Log = db.define('log', {
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    //unique: true
  },
  definition: {
    type: DataTypes.STRING,
    allowNull: false
    //unique: true
  },
  result: {
    type: DataTypes.STRING,
    allowNull: false,
    //unique: true
  },
  owner_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    //unique: true
  }
});

module.exports = Log;