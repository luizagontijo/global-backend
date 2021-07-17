//faz a comunicação com os servidor
require('dotenv').config(); // this is important!

module.exports = {
    development: {
        database: {
            host: process.env.DB_HOST_URL,
            port: process.env.DB_PORT,
            name: process.env.DB_NAME,
            dialect: 'postgres',
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,

        }
    },
    production: {
        database: {
            host: process.env.DATABASE_URL,
            host: process.env.DB_PORT,
        }
    }
}