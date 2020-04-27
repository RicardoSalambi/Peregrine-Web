const Sequelize = require('sequelize');
const mysql = require('mysql2');

module.exports = new Sequelize('testdb', 'root', 'NetlettiWorld@1', {

  host: 'localhost',
  dialect: 'mysql',
  define: {
    timestamps: false
  },

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }

});

