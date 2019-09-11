const router = require('express').Router();
let Livro = require("../models/livro.model");
const fs = require('fs');

function carregar() {
    let db = fs.readFileSync('banco/livros.json');
    return JSON.parse(db);
}

function gravar(json) {
    fs.writeFileSync('banco/livros.json', JSON.stringify(json));
}

router.route('/').get((req, res) => {
    var livros = carregar();
    res.status(200).json(livros);
});

router.route('/adicionar').post((req, res) => {

    const fotoCapa = req.body.fotoCapa;
    const nome = req.body.nome;
    const autor = req.body.autor;
    const ano = req.body.ano;
    const exemplares = req.body.exemplares;

    const novoLivro = new Livro({ fotoCapa, nome, autor, ano, exemplares });

    var livros = carregar();
    livros.push(novoLivro);
    gravar(livros);

    res.json(novoLivro);
})

router.route('/:id').get((req, res) => {
    var livros = carregar();
    var livro = livros.filter(livro => livro._id === req.params.id);
    res.json(livro[0]);
});

router.route('/:id').delete((req, res) => {
    var livros = carregar();
    var novaLista = livros.filter(livro => livro._id !== req.params.id);
    gravar(novaLista);
    res.json('Livro removido');
});

router.route('/update/:id').put((req, res) => {
    var livros = carregar();
    livros.map(livro => {
        if (livro._id === req.params.id) {
            livro.fotoCapa = req.body.fotoCapa !== undefined ? req.body.fotoCapa : livro.fotoCapa;
            livro.nome = req.body.nome !== undefined ? req.body.nome : livro.nome;
            livro.autor = req.body.autor !== undefined ? req.body.autor : livro.autor;
            livro.ano = req.body.ano !== undefined ? req.body.ano : livro.ano;
            livro.exemplares = req.body.exemplares !== undefined ? req.body.exemplares : livro.exemplares;
        }
    });

    gravar(livros);

    res.json('Livro Atualizado');
});

module.exports = router;