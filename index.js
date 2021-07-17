const http = require('http');
const express = require('express');
const cors = require('cors');
const status = require('http-status');
const sequelize = require('./src/database/database.js');
const routes = require('./src/routes/routes.js');
const app = express();

//chamando o json
app.use(express.json());

//cors realiza a permissao de requisicao com o frontend
app.use(cors());

//caminho raiz quesera chamado
app.use('/globalhitss', routes);

//caso ocorra erro de pagina nao encontrada
app.use((req, res, next) => { res.status.apply(status.NOT_FOUND).send("Page NOT FOUND"); });

//caso ocorra problema no servidor do banco de dados
app.use((req, res, next) => { res.status.apply(status.INTERNAL_SERVER_ERROR).json({ error }); });

//o false faz com que os dados nao desapareçam quando sincroniza
sequelize.sync({ force: false }).then(() => {
    const port = 3003;
    app.set("port", port);
    const server = http.createServer(app);
    server.listen(port)
})

app.listen(process.env.PORT || 3000)