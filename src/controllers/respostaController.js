//chama o Respostas de dentro de models
const Respostas = require('../models/respostas');
const status = require('http-status');

//comando para realizar inserção dos dados através de requisição
exports.Insert = (req, res, next) => {
    //criando variaveis de reconhecimento da requisiçao, de acordo com o que tem no model
    //lembrando que id é auto incrementavel, nao precisa chama-lo
    const idFormulario = req.body.idFormulario;
    const idAvaliador = req.body.idAvaliador;
    const idAvaliado = req.body.idAvaliado;
    const idPergunta = req.body.idPergunta;
    const respostaEnviada = req.body.respostaEnviada;

    //Sequelize ira enviar os dados atraves do comando create. create é para inserir
    Respostas.create({
        idFormulario: idFormulario, //nome da chave : constante criada acima
        idAvaliador: idAvaliador,
        idAvaliado: idAvaliado,
        idPergunta: idPergunta,
        respostaEnviada: respostaEnviada
        
    }).then(
        (resposta) => {
            if (resposta) {
                res.status(status.OK).send(resposta);
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
    Respostas.findAll()
        .then(
            (resposta) => {
                if (resposta) {
                    res.status(status.OK).send(resposta);
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

    Respostas.findByPk(id)
        .then(
            (resposta) => {
                if (resposta) {
                    res.status(status.OK).send(resposta);
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

    Respostas.findByPk(id)
        .then(
            (resposta) => {
                if (resposta) {
                    resposta.destroy({
                        where: { id: id }
                    }).then(
                        (resposta) => {
                            if (resposta) {
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
    const idAvaliador = req.body.idAvaliador;
    const idAvaliado = req.body.idAvaliado;
    const idPergunta = req.body.idPergunta;
    const respostaEnviada = req.body.respostaEnviada;

    Respostas.findByPk(id)
        .then(
            resposta => {
                if (resposta) {
                    resposta.update({
                        idFormulario: idFormulario,
                        idAvaliador: idAvaliador,
                        idAvaliado: idAvaliado,
                        idPergunta: idPergunta,
                        respostaEnviada: respostaEnviada
                    }, { where: { id: id } }
                    )
                        .then(
                            (resposta) => {
                                if (resposta) {
                                    res.status(status.OK).send(resposta);
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