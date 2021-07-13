//chamando o sequelize e o arquivo de configuraçao do databese.js
const Sequelize = require('sequelize');
const sequelize = require('../database/database.js')

// montando a estrutura da tabela no Sequelize.
// sequelize.define define a estrutura que a tabela deve possuir, passando o nome e os campos da tabela

const Usuarios = sequelize.define('usuarios', {
    id: {
        allowNull: false, //permite vazio?
        autoIncrement: true, //é autoicremente?
        primaryKey: true, //é chave primaria?
        type: Sequelize.INTEGER //define o tipo de dado
    },
    nome: {
        allowNull: false,
        type: Sequelize.STRING(255),
        validate: {
            len: [3, 255] //define tamanho minimo e maximo do campo
        }
    },
    login: {
        allowNull: false,
        type: Sequelize.STRING(20),
        validate: {
            len: [3, 20]
        }
    },
    senha: {
        allowNull: false,
        type: Sequelize.STRING(20),
        validate: {
            len: [3, 20]
        }
    },
    tipo: {
        allowNull: false,
        type: Sequelize.STRING(20),
        validate: {
            len: [3, 20]
        }
    },
    idTime: {
        type: Sequelize.INTEGER,
        references: {
            model: 'times', // refers to table name
            key: 'id', // 'id' refers to column in table
        }
    }
});

//chave estrangeira id avaliador dentro da tabela respostas
const respostasAvaliador = require('./respostas');
Usuarios.hasMany(respostasAvaliador, {
    foreignKey: 'idAvaliador', 
    onDelete: 'CASCADE', 
    onUpdate: 'CASCADE', 
    as: 'respsAvaliador'
})

//chave estrangeira id avaliado dentro da tabela respostas
const respostasAvaliado = require('./respostas');
Usuarios.hasMany(respostasAvaliado, {
    foreignKey: 'idAvaliado', 
    onDelete: 'CASCADE', 
    onUpdate: 'CASCADE', 
    as: 'respsAvaliado'
})

module.exports = Usuarios;