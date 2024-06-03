const Materia = require('../models/Materia');

// Listar todas as matérias
exports.getAllMaterias = async (req, res) => {
    try {
        const materias = await Materia.find().populate('professor');
        res.status(200).json(materias);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Criar nova matéria
exports.createMateria = async (req, res) => {
    const materia = new Materia({
        nome: req.body.nome,
        descricao: req.body.descricao,
        professor: req.body.professor
    });

    try {
        const newMateria = await materia.save();
        res.status(201).json(newMateria);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Atualizar matéria
exports.updateMateria = async (req, res) => {
    try {
        const materia = await Materia.findById(req.params.id);
        if (materia == null) {
            return res.status(404).json({ message: 'Matéria não encontrada' });
        }

        if (req.body.nome != null) {
            materia.nome = req.body.nome;
        }
        if (req.body.descricao != null) {
            materia.descricao = req.body.descricao;
        }
        if (req.body.professor != null) {
            materia.professor = req.body.professor;
        }

        const updatedMateria = await materia.save();
        res.status(200).json(updatedMateria);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Deletar matéria
exports.deleteMateria = async (req, res) => {
    try {
        const materia = await Materia.findById(req.params.id);
        if (materia == null) {
            return res.status(404).json({ message: 'Matéria não encontrada' });
        }

        await materia.remove();
        res.status(200).json({ message: 'Matéria deletada' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
