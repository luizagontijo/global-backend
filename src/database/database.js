//iniciando o sequelize
const Sequelize = require('sequelize');

//usando modo dev
const environment = process.env.NODE_ENV || 'development';

//cria um objeto que recebera os dados de development
const config = require('../config/config.js')[environment];
//é como se o config recebesse as informações do modules dentro do arquivo config
// config = {
//  database:{
//     host:'localhost',
//     port:3306,
//     name:'global',
//     dialec:'mysql',
//     user:'root',
//     password:''
//  }

//criando um obejto chamado sequelize que faz uso da classe sequelize e passa as informaçoes do banco de dados que estao dentro do config, pra ele ter o caminho do banco de dados
const sequelize = new Sequelize (
    config.database.name, //servicos
    config.database.user, //root
    config.database.password, //vazio
    {
        host: config.database.host, //localhost
        dialect: config.database.dialect //mysql
    }
)
    
module.exports = sequelize;