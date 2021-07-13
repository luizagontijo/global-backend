//chamando o sequelize e o arquivo de configuraçao do databese.js
const Sequelize = require('sequelize');
const sequelize = require('../database/database.js')

// montando a estrutura da tabela no Sequelize.
// sequelize.define define a estrutura que a tabela deve possuir, passando o nome e os campos da tabela

const Perguntas = sequelize.define('perguntas', {
    id: {
        allowNull: false, //permite vazio?
        autoIncrement: true, //é autoicremente?
        primaryKey: true, //é chave primaria?
        type: Sequelize.INTEGER //define o tipo de dado
    },
    idFormulario: {
        type: Sequelize.INTEGER,
        references: {
            model: 'formularios', // refers to table name
            key: 'id', // 'id' refers to column in table
        }
    },
    textoPergunta: {
        allowNull: false,
        type: Sequelize.STRING(255),
        validate: {
            len: [3, 255] //define tamanho minimo e maximo do campo
        }
    },
    tipo: {
        allowNull: false,
        type: Sequelize.STRING(255),
        defaultValue: "texto",
    }
});

//chave estrangeira id pergunta dentro da tabela respostas
const respostas = require('./respostas');
Perguntas.hasMany(respostas, {
    foreignKey: 'idPergunta', onDelete: 'CASCADE', onUpdate: 'CASCADE', as: 'resps'
})

module.exports = Perguntas;