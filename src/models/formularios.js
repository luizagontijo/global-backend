//chamando o sequelize e o arquivo de configuraçao do database.js
const Sequelize = require('sequelize');
const sequelize = require('../database/database.js')

// montando a estrutura da tabela no Sequelize.
// sequelize.define define a estrutura que a tabela deve possuir, passando o nome e os campos da tabela

const Formularios = sequelize.define('formularios', {
    id: {
        allowNull: false, //permite vazio?
        autoIncrement: true, //é autoicremente?
        primaryKey: true, //é chave primaria?
        type: Sequelize.INTEGER //define o tipo de dado
    },
    idTime: {
        type: Sequelize.INTEGER,
        references: {
            model: 'times', // refers to table name
            key: 'id', // 'id' refers to column in table
        }
    },
    tipo: {
        allowNull: false,
        type: Sequelize.STRING(20),
        validate: {
            len: [3, 20] //define tamanho minimo e maximo do campo
        }
    }
});

//chave estrangeira id formulario dentro da tabela perguntas
const perguntas = require('./perguntas');
Formularios.hasMany(perguntas, {
    foreignKey: 'idFormulario', onDelete: 'CASCADE', onUpdate: 'CASCADE', as: 'pergs'
})

//chave estrangeira id formulario dentro da tabela respostas
const respostas = require('./respostas');
Formularios.hasMany(respostas, {
    foreignKey: 'idFormulario', onDelete: 'CASCADE', onUpdate: 'CASCADE', as: 'resps'
})


module.exports = Formularios;