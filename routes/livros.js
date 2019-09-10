const router = require('express').Router();
let Livro = require("../models/livro.model");

router.route('/').get((req, res) => {
    Livro.find()
        .then(livros => res.json(livros))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/adicionar').post((req, res) => {

    const fotoCapa = req.body.fotoCapa;
    const nome = req.body.nome;
    const autor = req.body.autor;
    const ano = req.body.ano;
    const exemplares = req.body.exemplares;

    const novoLivro = new Livro({
        fotoCapa,
        nome,
        autor,
        ano,
        exemplares
    });

    novoLivro.save()
        .then(() => res.json('Livro Adicionado'))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').get((req, res) => {
    Livro.findById(req.params.id)
        .then(livro => res.json(livro))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Livro.findByIdAndDelete(req.params.id)
        .then(() => res.json('Livro removido'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {

    Livro.findById(req.params.id)
        .then(livro => {

            livro.fotoCapa = req.body.fotoCapa;
            livro.nome = req.body.nome;
            livro.autor = req.body.autor;
            livro.ano = req.body.ano;
            livro.exemplares = Number(req.body.exemplares);

            livro.save()
                .then(() => res.json('Livro Atualizado'))
                .catch(err => res.status(400).json('Error: ' + err))
        });
});

module.exports = router;