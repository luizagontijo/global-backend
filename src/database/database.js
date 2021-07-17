const Sequelize = require('sequelize');
const config = require('../config/config');



const sequelize = new Sequelize({
    database: config.development.database.name,
    username: config.development.database.user,
    password: config.development.database.password,
    host: config.development.database.host,
    port: 5432,
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // <<<<<<< YOU NEED THIS
        }
    },
});


module.exports = sequelize;