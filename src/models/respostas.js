//chamando o sequelize e o arquivo de configuraçao do databese.js
const Sequelize = require('sequelize');
const sequelize = require('../database/database.js')

// montando a estrutura da tabela no Sequelize.
// sequelize.define define a estrutura que a tabela deve possuir, passando o nome e os campos da tabela

const Respostas = sequelize.define('respostas', {
    id: {
        allowNull: false, //permite vazio?
        autoIncrement: true, //é autoicremente?
        primaryKey: true, //é chave primaria?
        type: Sequelize.INTEGER //define o tipo de dado
    },
    respostaEnviada: {
        allowNull: false,
        type: Sequelize.STRING(255),
        validate: {
            len: [1, 255] //define tamanho minimo e maximo do campo
        }
    },
    idFormulario: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
            model: 'formularios', // refers to table name
            key: 'id', // 'id' refers to column in table
        }
    },
    idAvaliador: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
            model: 'usuarios', // refers to table name
            key: 'id', // 'id' refers to column in table
        }
    },
    idAvaliado: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
            model: 'usuarios', // refers to table name
            key: 'id', // 'id' refers to column in table
        }
    },
    idPergunta: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
            model: 'perguntas', // refers to table name
            key: 'id', // 'id' refers to column in table
        }
    }
});

module.exports = Respostas;