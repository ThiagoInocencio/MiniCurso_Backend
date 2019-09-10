const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "5mb" }));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Conexão realizada com sucesso");
})

const rotasDeLivro = require("./routes/livros");

app.use('/livros', rotasDeLivro);

app.listen(port, () => {
    console.log(`Servidor está rodando na porta: ${port}`);
})