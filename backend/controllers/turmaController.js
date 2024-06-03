const Turma = require('../models/Turma');
const Aluno = require('../models/Aluno');
const Materia = require('../models/Materia');

// Listar todas as turmas
exports.getAllTurmas = async (req, res) => {
    try {
        const turmas = await Turma.find().populate('alunos').populate('materias');
        res.status(200).json(turmas);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Criar nova turma
exports.createTurma = async (req, res) => {
    const turma = new Turma({
        nome: req.body.nome,
        alunos: req.body.alunos || [],
        materias: req.body.materias || []
    });

    try {
        const newTurma = await turma.save();
        res.status(201).json(newTurma);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Atualizar turma
exports.updateTurma = async (req, res) => {
    try {
        const turma = await Turma.findById(req.params.id);
        if (turma == null) {
            return res.status(404).json({ message: 'Turma não encontrada' });
        }

        if (req.body.nome != null) {
            turma.nome = req.body.nome;
        }
        if (req.body.alunos != null) {
            turma.alunos = req.body.alunos;
        }
        if (req.body.materias != null) {
            turma.materias = req.body.materias;
        }

        const updatedTurma = await turma.save();
        res.status(200).json(updatedTurma);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Deletar turma
exports.deleteTurma = async (req, res) => {
    try {
        const turma = await Turma.findById(req.params.id);
        if (turma == null) {
            return res.status(404).json({ message: 'Turma não encontrada' });
        }

        await turma.remove();
        res.status(200).json({ message: 'Turma deletada' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
