const mongoose = require('mongoose')

const MateriaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    descricao: String,
    professor: { type: mongoose.Schema.Types.ObjectId, ref: 'Professor', required: true }
});

module.exports = mongoose.model('Materia', MateriaSchema)