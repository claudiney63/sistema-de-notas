const Aluno = require('../models/Aluno')

// Função para calcular a média de um bimestre
function calcularMediaBimestre(bimestre) {
    const total = bimestre.notas.reduce((acc, nota) => acc + nota, 0);
    return total / bimestre.notas.length;
}

// Listar todos os alunos
exports.getAllAlunos = async (req, res) => {
    try {
        const alunos = await Aluno.find().populate('turma').populate('notas.materia');
        res.status(200).json(alunos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Criar novo aluno
exports.createAluno = async (req, res) => {
    const notas = req.body.notas.map(nota => ({
        materia: nota.materia,
        bimestres: nota.bimestres.map(bimestre => ({
            notas: bimestre.notas,
            media: calcularMedia(bimestre)
        })),
        faltas: nota.faltas
    }));

    const aluno = new Aluno({
        nome: req.body.nome,
        turma: req.body.turma,
        turno: req.body.turno,
        notas: notas
    });

    try {
        const newAluno = await aluno.save();
        res.status(201).json(newAluno);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Atualizar aluno
exports.updateAluno = async (req, res) => {
    try {
        const aluno = await Aluno.findById(req.params.id);
        if (aluno == null) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }

        if (req.body.nome != null) {
            aluno.nome = req.body.nome;
        }
        if (req.body.turma != null) {
            aluno.turma = req.body.turma;
        }
        if (req.body.turno != null) {
            aluno.turno = req.body.turno;
        }
        if (req.body.notas != null) {
            aluno.notas = req.body.notas.map(nota => ({
                materia: nota.materia,
                bimestres: nota.bimestres.map(bimestre => ({
                    notas: bimestre.notas,
                    media: calcularMedia(bimestre)
                })),
                faltas: nota.faltas
            }));
        }

        const updatedAluno = await aluno.save();
        res.status(200).json(updatedAluno);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Deletar aluno
exports.deleteAluno = async (req, res) => {
    try {
        const aluno = await Aluno.findById(req.params.id);
        if (aluno == null) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }

        await aluno.remove();
        res.status(200).json({ message: 'Aluno deletado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
