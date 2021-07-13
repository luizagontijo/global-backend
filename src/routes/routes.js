const express = require('express');
const router = express.Router();

//dentro de cada rota, trazer as funções

const timeController = require('../controllers/timeController')
    //post, porque usa a função pra inserir (caminho pra acessar a rota, quem é chamado )
router.post('/inserirTime', timeController.Insert);
router.get('/times', timeController.SearchAll);
router.get('/times/:id', timeController.SearchOne);
router.put('/deletarTime/:id', timeController.Delete);
router.put('/editarTime/:id', timeController.Update);
router.get('/usersTime', timeController.SearchAllUsersTimes);
router.get('/usersTime/:id', timeController.SearchOneUsersTimes);
router.get('/formsTime', timeController.SearchAllFormsTimes);
router.get('/formsTime/:id', timeController.SearchOneFormsTimes);
router.get('/contagemTimes', timeController.ContagemTimes);;

//rotas do usuarioController
const usuarioController = require('../controllers/usuarioController')
    //post, porque usa a função pra inserir (caminho pra acessar a rota, quem é chamado )
router.post('/inserirUsuario/:id', usuarioController.Insert);
router.get('/usuarios', usuarioController.SearchAll);
router.get('/usuarios/:id', usuarioController.SearchOne);
router.post('/usuarios/search', usuarioController.Search);
router.put('/deletarUsuario/:id', usuarioController.Delete);
router.put('/editarUsuario/:id', usuarioController.Update);
router.get('/respsAvaliador', usuarioController.SearchAllRespsAvaliador);
router.get('/respsAvaliador/:id', usuarioController.SearchOneRespsAvaliador);
router.get('/respsAvaliado', usuarioController.SearchAllRespsAvaliado);
router.get('/respsAvaliado/:id', usuarioController.SearchOneRespsAvaliado);
router.get('/contagemUsuarios', usuarioController.ContagemUsuarios);
router.get('/usuariosRecentes', usuarioController.Recentes);


//rotas do formularioController
const formularioController = require('../controllers/formularioController')

router.post('/inserirFormulario', formularioController.Insert);
router.get('/formularios', formularioController.SearchAll);
router.get('/formularios/:id', formularioController.SearchOne);
router.put('/deletarFormulario/:id', formularioController.Delete);
router.put('/editarFormulario/:id', formularioController.Update);
router.get('/pergsFormulario', formularioController.SearchAllPergsFormularios);
router.get('/pergsFormulario/:id', formularioController.SearchOnePergsFormularios);
router.get('/respsFormulario', formularioController.SearchAllRespsFormularios);
router.get('/respsFormulario/:id', formularioController.SearchOneRespsFormularios);


//rotas do perguntaController
const perguntaController = require('../controllers/perguntaController')
    //post, porque usa a função pra inserir (caminho pra acessar a rota, quem é chamado )
router.post('/inserirPergunta', perguntaController.Insert);
router.get('/perguntas', perguntaController.SearchAll);
router.get('/perguntas/:id', perguntaController.SearchOne);
router.put('/deletarPergunta/:id', perguntaController.Delete);
router.put('/editarPergunta/:id', perguntaController.Update);
router.get('/respsPergunta', perguntaController.SearchAllRespsPerguntas);
router.get('/respsPergunta/:id', perguntaController.SearchOneRespsPerguntas);

const respostaController = require('../controllers/respostaController')

router.post('/inserirResposta', respostaController.Insert);
router.get('/respostas', respostaController.SearchAll);
router.get('/respostas/:id', respostaController.SearchOne);
router.put('/deletarResposta/:id', respostaController.Delete);
router.put('/editarResposta/:id', respostaController.Update);




module.exports = router