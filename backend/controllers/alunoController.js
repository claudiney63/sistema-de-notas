const Aluno = require('../models/Aluno')

// Listar todos os alunos
exports.getAllAlunos = async (req, res) => {
    try {
        const alunos = await Aluno.find().populate('turma').populate('notas.materia');
        res.status(200).json(alunos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Criar novo aluno sem fornecer notas
exports.createAluno = async (req, res) => {
    const { nome, turma, turno } = req.body;

    // Verifica se os campos obrigatórios foram fornecidos
    if (!nome || !turma || !turno) {
        return res.status(400).json({ message: 'Nome, turma e turno são campos obrigatórios.' });
    }

    const aluno = new Aluno({
        nome,
        turma,
        turno,
        notas: [] // Inicialmente, não há notas fornecidas para o aluno
    });

    try {
        const newAluno = await aluno.save();
        res.status(201).json(newAluno);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Criar novo aluno
// exports.createAluno = async (req, res) => {
//     const notas = req.body.notas.map(nota => ({
//         materia: nota.materia,
//         bimestres: nota.bimestres.map(bimestre => ({
//             notas: bimestre.notas
//         })),
//         faltas: nota.faltas
//     }));

//     const aluno = new Aluno({
//         nome: req.body.nome,
//         turma: req.body.turma,
//         turno: req.body.turno,
//         notas: notas
//     });

//     try {
//         const newAluno = await aluno.save();
//         res.status(201).json(newAluno);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// };

// Associar matéria e fornecer notas para um aluno
exports.associateMateriaAndProvideNotas = async (req, res) => {
    const { alunoId, materiaId, notasBimestres } = req.body;

    try {
        const aluno = await Aluno.findById(alunoId);
        if (!aluno) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }

        // Adicionar a matéria ao array de notas do aluno
        aluno.notas.push({
            materia: materiaId,
            bimestres: notasBimestres,
            faltas: 0 // Defina o número de faltas conforme necessário
        });

        // Salvar as alterações no banco de dados
        const alunoAtualizado = await aluno.save();
        res.status(200).json(alunoAtualizado);
    } catch (err) {
        res.status(500).json({ message: err.message });
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
                    notas: bimestre.notas
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
