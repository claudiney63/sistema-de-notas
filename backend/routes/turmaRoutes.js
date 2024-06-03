const express = require('express');
const router = express.Router();
const turmaController = require('../controllers/turmaController');

router.get('/', turmaController.getAllTurmas);
router.post('/', turmaController.createTurma);
router.put('/:id', turmaController.updateTurma);
router.delete('/:id', turmaController.deleteTurma);

module.exports = router;
