const mongoose = require('mongoose')

const NotaSchema = new mongoose.Schema({
    materia: { type: mongoose.Schema.Types.ObjectId, ref: 'Materia' },
    bimestres: [{
        notas: [Number],  // Duas notas por bimestre
        media: Number,     // Média do bimestre
        
    }]
})

const AlunoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    turma: { type: mongoose.Schema.Types.ObjectId, ref: 'Turma' },
    notas: [NotaSchema],
    faltas: Number
})

module.exports = mongoose.model('Aluno', AlunoSchema)