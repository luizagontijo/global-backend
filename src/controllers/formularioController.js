//chama o Formularios de dentro de models
const Formularios = require('../models/formularios');
const status = require('http-status');

//comando para realizar inserção dos dados através de requisição
exports.Insert = (req, res, next) => {
    //criando variaveis de reconhecimento da requisiçao, de acordo com o que tem no model
    //lembrando que id é auto incrementavel, nao precisa chama-lo
    const idTime = req.body.idTime;
    const tipo = req.body.tipo;

    //Sequelize ira enviar os dados atraves do comando create. create é para inserir
    Formularios.create({
        idTime: idTime,
        tipo: tipo//nome da chave : constante criada acima
    }).then(
        (formulario) => {
            if (formulario) {
                res.status(status.OK).send(formulario);
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
    Formularios.findAll()
        .then(
            (formulario) => {
                if (formulario) {
                    res.status(status.OK).send(formulario);
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

    Formularios.findByPk(id)
        .then(
            (formulario) => {
                if (formulario) {
                    res.status(status.OK).send(formulario);
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

    Formularios.findByPk(id)
        .then(
            (formulario) => {
                if (formulario) {
                    formulario.destroy({
                        where: { id: id }
                    }).then(
                        (formulario) => {
                            if (formulario) {
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
    const idTime = req.body.idTime;
    const tipo = req.body.tipo;
    
    Formularios.findByPk(id)
        .then(
            formulario => {
                if (formulario) {
                    formulario.update({
                        idTime: idTime,
                        tipo: tipo
                    }, { where: { id: id } }
                    )
                        .then(
                            (formulario) => {
                                if (formulario) {
                                    res.status(status.OK).send(formulario);
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

// chave estrangeira - mostra todas perguntas em seus formularios
exports.SearchAllPergsFormularios = (req, res, next) => {
    Formularios.findAll({include: ['pergs']})
        .then(formulario => {
                if (formulario) {
                    res.status(status.OK).send(formulario);
                }
            }
        ).catch(
            () => {
                error = next(error)
            }
        )
}

// chave estrangeira - mostra todas as perguntas de um determinado form
exports.SearchOnePergsFormularios = (req, res, next) => {
    const id = req.params.id;

    Formularios.findByPk(id, {include: ['pergs']})
        .then(
            (formulario) => {
                if (formulario) {
                    res.status(status.OK).send(formulario);
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


// chave estrangeira - mostra todas respostas em seus formularios
exports.SearchAllRespsFormularios = (req, res, next) => {
    Formularios.findAll({include: ['resps']})
        .then(formulario => {
                if (formulario) {
                    res.status(status.OK).send(formulario);
                }
            }
        ).catch(
            () => {
                error = next(error)
            }
        )
}

// chave estrangeira - mostra todas as respostas de um determinado form
exports.SearchOneRespsFormularios = (req, res, next) => {
    const id = req.params.id;

    Formularios.findByPk(id, {include: ['resps']})
        .then(
            (formulario) => {
                if (formulario) {
                    res.status(status.OK).send(formulario);
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