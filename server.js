const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "5mb" }));

const rotasDeLivro = require("./routes/livros");

app.use('/livros', rotasDeLivro);

app.listen(port, () => {
    console.log(`Servidor está rodando na porta: ${port}`);
})