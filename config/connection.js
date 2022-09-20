const Sequelize = require('sequelize');

require('dotenv-safe').config({allowEmptyValues: false});



const sequelize = process.env.JAWSDB_URL
    ? new Sequelize(process.env.JAWSDB_URL)
    : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'dgb_login',
        port: 3306
    });

  module.exports = sequelize;
