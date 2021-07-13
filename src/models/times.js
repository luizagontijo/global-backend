//chamando o sequelize e o arquivo de configuraçao do database.js
const Sequelize = require('sequelize');
const sequelize = require('../database/database.js')

// montando a estrutura da tabela no Sequelize.
// sequelize.define define a estrutura que a tabela deve possuir, passando o nome e os campos da tabela

const Times = sequelize.define('times', {
    id: {
        allowNull: false, //permite vazio?
        autoIncrement: true, //é autoincrement?
        primaryKey: true, //é chave primaria?
        type: Sequelize.INTEGER //define o tipo de dado
    },
    nome: {
        allowNull: false,
        type: Sequelize.STRING(255),
        validate: {
            len: [3, 255] //define tamanho minimo e maximo do campo
        }
    }
});

//envia a chave estrangeira idTime para o model usuarios
const usuarios = require('./usuarios');
Times.hasMany(usuarios, {
    foreignKey: 'idTime',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    as: 'users'
})

//envia a chave estrangeira idTime para o model formularios
const formularios = require('./formularios');
Times.hasMany(formularios, {
    foreignKey: 'idTime',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    as: 'forms'
})

module.exports = Times;