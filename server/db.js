const {Sequelize} = require('sequelize');

const db = new Sequelize("postgres://postgres:b52a7eb4a96745e2b4da3be91145af0e@localhost:5432/workout-server");

module.exports = db;