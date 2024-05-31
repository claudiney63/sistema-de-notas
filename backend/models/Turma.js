const mongoose = require('mongoose')

const TurmaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    alunos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Aluno' }],
    materias: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Materia' }]
});

module.exports = mongoose.model('Turma', TurmaSchema)