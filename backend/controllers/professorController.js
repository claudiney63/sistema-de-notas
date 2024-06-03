const Professor = require('../models/Professor');

// Listar todos os professores
exports.getAllProfessores = async (req, res) => {
    try {
        const professores = await Professor.find();
        res.status(200).json(professores);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Criar novo professor
exports.createProfessor = async (req, res) => {
    const professor = new Professor({
        nome: req.body.nome
    });

    try {
        const newProfessor = await professor.save();
        res.status(201).json(newProfessor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Atualizar professor
exports.updateProfessor = async (req, res) => {
    try {
        const professor = await Professor.findById(req.params.id);
        if (professor == null) {
            return res.status(404).json({ message: 'Professor não encontrado' });
        }

        if (req.body.nome != null) {
            professor.nome = req.body.nome;
        }

        const updatedProfessor = await professor.save();
        res.status(200).json(updatedProfessor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Deletar professor
exports.deleteProfessor = async (req, res) => {
    try {
        const professor = await Professor.findById(req.params.id);
        if (professor == null) {
            return res.status(404).json({ message: 'Professor não encontrado' });
        }

        await professor.remove();
        res.status(200).json({ message: 'Professor deletado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
