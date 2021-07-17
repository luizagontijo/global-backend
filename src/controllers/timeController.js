//chama o Time de dentro de models
const Times = require('../models/times');
const Usuario = require("../models/usuarios")
const status = require('http-status');
const sequelize = require('../database/database')

//comando para realizar inserção dos dados através de requisição
exports.Insert = (req, res, next) => {
    //criando variaveis de reconhecimento da requisiçao, de acordo com o que tem no model
    //lembrando que id é auto incrementavel, nao precisa chama-lo
    const nome = req.body.nome;

    //Sequelize ira enviar os dados atraves do comando create. create é para inserir
    Times.create({
        nome: nome //nome da chave : constante criada acima
    }).then(
        (time) => {
            if (time) {
                res.status(status.OK).send(time);
            } else {
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
    Times.findAll()
        .then(
            (time) => {
                if (time) {
                    res.status(status.OK).send(time);
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

    Times.findByPk(id)
        .then(
            (time) => {
                if (time) {
                    res.status(status.OK).send(time);
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

    Times.findByPk(id)
        .then(
            (time) => {
                if (time) {
                    time.destroy({
                        where: { id: id }
                    }).then(
                        (time) => {
                            if (time) {
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
    const nome = req.body.nome;

    Times.findByPk(id)
        .then(
            time => {
                if (time) {
                    time.update({
                            nome: nome,
                        }, { where: { id: id } })
                        .then(
                            (time) => {
                                if (time) {
                                    res.status(status.OK).send(time);
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

// chave estrangeira - mostra todos os times e seus usuarios
exports.SearchAllUsersTimes = (req, res, next) => {
    Times.findAll({ include: [{ model: Usuario, as: "users" }] })
        .then(time => {
            if (time) {
                res.status(status.OK).send(time);
            }
        }).catch(
            () => {
                error = next(error)
            }
        )
}

// chave estrangeira - mostra todos os usuarios de um determinado time
exports.SearchOneUsersTimes = (req, res, next) => {
    const id = req.params.id;

    Times.findByPk(id, { include: [{ model: Usuario, as: "users" }] })
        .then(
            (time) => {
                if (time) {
                    res.status(status.OK).send(time);
                } else {
                    res.status(status.NOT_FOUND).send();
                }
            }
        ).catch(
            () => {
                error = next(error)
            }
        )
}

// chave estrangeira - mostra todos os times e seus formularios
exports.SearchAllFormsTimes = (req, res, next) => {
    Times.findAll({ include: ['forms'] })
        .then(time => {
            if (time) {
                res.status(status.OK).send(time);
            }
        }).catch(
            () => {
                error = next(error)
            }
        )
}

// chave estrangeira - mostra todos os formularios de um determinado time
exports.SearchOneFormsTimes = (req, res, next) => {
    const id = req.params.id;

    Times.findByPk(id, { include: ['forms'] })
        .then(
            (time) => {
                if (time) {
                    res.status(status.OK).send(time);
                } else {
                    res.status(status.NOT_FOUND).send();
                }
            }
        ).catch(
            () => {
                error = next(error)
            }
        )
}



exports.ContagemTimes = async(req, res, next) => {
    try {
        const [response] = await sequelize.query('SELECT count(id) AS count FROM times')
        res.status(status.OK).send(response[0]);
    } catch (error) {
        next(error)
    }

}