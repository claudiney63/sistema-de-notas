const mongoose = require('mongoose')

const TurmaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
});

module.exports = mongoose.model('Turma', TurmaSchema)