const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const livroSchema = new Schema({
    fotoCapa: { type: String, required: true },
    nome: { type: String, required: true },
    autor: { type: String, required: true },
    ano: { type: Number, required: true },
    exemplares: { type: Number, required: true }
}, {
    timestamps: true,
});

const Livro = mongoose.model('Livro', livroSchema);

module.exports = Livro;