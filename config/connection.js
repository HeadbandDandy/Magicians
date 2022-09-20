const Sequelize = require('sequelize');

require('dotenv-safe').config({allowEmptyValues: false});



module.exports = {
    client: 'mysql2',
    version: process.env.MYSQL_Version || 8,
    connection: {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'dgb_login',
        port: 3306
    },
    migrations: {
        extension:'ts',
        directory: './migrations',
    },
    debug: process.env.LOG_LEVEL === 'debug'
}