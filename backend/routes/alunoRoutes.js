const express = require('express')
const router = express.Router();
const alunoController = require('../controllers/alunoController')

router.get('/', alunoController.getAllAlunos)
router.post('/', alunoController.createAluno)
router.post('/addNota', alunoController.associateMateriaAndProvideNotas)
router.put('/:id', alunoController.updateAluno)
router.delete('/:id', alunoController.deleteAluno)

module.exports = router