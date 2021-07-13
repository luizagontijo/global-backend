//chama o Perguntas de dentro de models
const Perguntas = require('../models/perguntas');
const status = require('http-status');

//comando para realizar inserção dos dados através de requisição
exports.Insert = (req, res, next) => {
    //criando variaveis de reconhecimento da requisiçao, de acordo com o que tem no model
    //lembrando que id é auto incrementavel, nao precisa chama-lo
    const idFormulario = req.body.idFormulario;
    const textoPergunta = req.body.textoPergunta;
    const tipo = req.body.tipo;

    //Sequelize ira enviar os dados atraves do comando create. create é para inserir
    Perguntas.create({
        idFormulario: idFormulario, //nome da chave : constante criada acima
        textoPergunta: textoPergunta,
        tipo: tipo
    }).then(
        (pergunta) => {
            if (pergunta) {
                res.status(status.OK).send(pergunta);
            }
            else {
                res.status(status.NOT_FOUND).send();
            }
        }
    ).catch(
        () => {
            error = next(error)
        }
    )

}

exports.SearchAll = (req, res, next) => {
    Perguntas.findAll()
        .then(
            (pergunta) => {
                if (pergunta) {
                    res.status(status.OK).send(pergunta);
                }
            }
        ).catch(
            () => {
                error = next(error)
            }
        )
}

exports.SearchOne = (req, res, next) => {
    const id = req.params.id;

    Perguntas.findByPk(id)
        .then(
            (pergunta) => {
                if (pergunta) {
                    res.status(status.OK).send(pergunta);
                }
            }
        ).catch(
            () => {
                error = next(error)
            }
        )
}

exports.Delete = (req, res, next) => {
    const id = req.params.id;

    Perguntas.findByPk(id)
        .then(
            (pergunta) => {
                if (pergunta) {
                    pergunta.destroy({
                        where: { id: id }
                    }).then(
                        (pergunta) => {
                            if (pergunta) {
                                res.status(status.OK).send();
                            }
                        }
                    ).catch(
                        () => {
                            error = next(error)
                        }
                    )
                }
            }
        ).catch(
            () => {
                error = next(error)
            }
        )
}

exports.Update = (req, res, next) => {
    const id = req.params.id;
    const idFormulario = req.body.idFormulario;
    const textoPergunta = req.body.textoPergunta;
    const tipo = req.body.tipo;

    Perguntas.findByPk(id)
        .then(
            pergunta => {
                if (pergunta) {
                    pergunta.update({
                        idFormulario: idFormulario,
                        textoPergunta: textoPergunta,
                        tipo: tipo
                    }, { where: { id: id } }
                    )
                        .then(
                            (pergunta) => {
                                if (pergunta) {
                                    res.status(status.OK).send(pergunta);
                                }
                            }
                        ).catch(
                            () => {
                                error => next(error)
                            }
                        )
                }
            }
        )
        .catch(
            () => {
                error => next(error)
            }
        )
}

// chave estrangeira - mostra todas respostas para as perguntas
exports.SearchAllRespsPerguntas = (req, res, next) => {
    Perguntas.findAll({include: ['resps']})
        .then(pergunta => {
                if (pergunta) {
                    res.status(status.OK).send(pergunta);
                }
            }
        ).catch(
            () => {
                error = next(error)
            }
        )
}

// chave estrangeira - mostra todas as respostas de uma determinada pergunta
exports.SearchOneRespsPerguntas = (req, res, next) => {
    const id = req.params.id;

    Perguntas.findByPk(id, {include: ['resps']})
        .then(
            (pergunta) => {
                if (pergunta) {
                    res.status(status.OK).send(pergunta);
                }else{
                    res.status(status.NOT_FOUND).send();
                }
            }
        ).catch(
            () => {
                error = next(error)
            }
        )
}