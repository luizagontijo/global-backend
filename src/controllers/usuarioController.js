//chama o Usuarios de dentro de models
const Usuarios = require('../models/usuarios');
const status = require('http-status');
const sequelize = require('../database/database')

//comando para realizar inserção dos dados através de requisição
exports.Insert = (req, res, next) => {
    //criando variaveis de reconhecimento da requisiçao, de acordo com o que tem no model
    //lembrando que id é auto incrementavel, nao precisa chama-lo
    const nome = req.body.nome;
    const login = req.body.login;
    const senha = req.body.senha;
    const tipo = req.body.tipo;
    const idTime = req.body.idTime;

    //Sequelize ira enviar os dados atraves do comando create. create é para inserir
    Usuarios.create({
        nome: nome, //nome da chave : constante criada acima
        login: login,
        senha: senha,
        tipo: tipo,
        idTime: idTime
    }).then(
        (usuario) => {
            if (usuario) {
                res.status(status.OK).send(usuario);
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
    Usuarios.findAll()
        .then(
            (usuario) => {
                if (usuario) {
                    res.status(status.OK).send(usuario);
                }
            }
        ).catch(
            () => {
                error = next(error)
            }
        )
}

exports.Search = async(req, res, next) => {
    console.log("aqui")
    const {
        q
    } = req.query;
    const [response] = await sequelize.query(`SELECT * FROM usuarios WHERE nome LIKE '%${q}%' OR login LIKE '%${q}%'`)
    res.status(status.OK).send(response);
}

exports.SearchOne = (req, res, next) => {
    const id = req.params.id;

    Usuarios.findByPk(id)
        .then(
            (usuario) => {
                if (usuario) {
                    res.status(status.OK).send(usuario);
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

    Usuarios.findByPk(id)
        .then(
            (usuario) => {
                if (usuario) {
                    usuario.destroy({
                        where: { id: id }
                    }).then(
                        (usuario) => {
                            if (usuario) {
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
    const login = req.body.login;
    const senha = req.body.senha;
    const tipo = req.body.tipo;
    const idTime = req.body.idTime;

    Usuarios.findByPk(id)
        .then(
            usuario => {
                if (usuario) {
                    usuario.update({
                            nome: nome,
                            login: login,
                            senha: senha,
                            tipo: tipo,
                            idTime: idTime
                        }, { where: { id: id } })
                        .then(
                            (usuario) => {
                                if (usuario) {
                                    res.status(status.OK).send(usuario);
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

// chave estrangeira - mostra todas respostas por todos avaliadores
exports.SearchAllRespsAvaliador = (req, res, next) => {
    Usuarios.findAll({ include: ['respsAvaliador'] })
        .then(usuario => {
            if (usuario) {
                res.status(status.OK).send(usuario);
            }
        }).catch(
            () => {
                error = next(error)
            }
        )
}

// chave estrangeira - mostra todas as respostas de uma determinado avaliador
exports.SearchOneRespsAvaliador = (req, res, next) => {
    const id = req.params.id;

    Usuarios.findByPk(id, { include: ['respsAvaliador'] })
        .then(
            (usuario) => {
                if (usuario) {
                    res.status(status.OK).send(usuario);
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

// chave estrangeira - mostra todas respostas por todos avaliados
exports.SearchAllRespsAvaliado = (req, res, next) => {
    Usuarios.findAll({ include: ['respsAvaliado'] })
        .then(usuario => {
            if (usuario) {
                res.status(status.OK).send(usuario);
            }
        }).catch(
            () => {
                error = next(error)
            }
        )
}

// chave estrangeira - mostra todas as respostas de uma determinado avaliado
exports.SearchOneRespsAvaliado = (req, res, next) => {
    const id = req.params.id;

    Usuarios.findByPk(id, { include: ['respsAvaliado'] })
        .then(
            (usuario) => {
                if (usuario) {
                    res.status(status.OK).send(usuario);
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

exports.ContagemUsuarios = async(req, res, next) => {
    try {
        const [response] = await sequelize.query('SELECT count(id) AS count FROM usuarios')
        res.status(status.OK).send(response[0]);
    } catch (error) {
        next(error)
    }
}

exports.Recentes = async(req, res, next) => {
    try {
        const [response] = await sequelize.query('SELECT * FROM  usuarios order by  id desc LIMIT 5 ')
        res.status(status.OK).send(response);
    } catch (error) {
        next(error)
    }
}