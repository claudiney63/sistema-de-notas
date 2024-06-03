import React, { useState } from 'react';

const alunosJson = require('../data/alunos.json');
const materiasJson = require('../data/materias.json');
const turmasJson = require('../data/turmas.json');

const Turmas = () => {
  const [nome, setNome] = useState('');
  const [alunos, setAlunos] = useState(alunosJson);
  const [materias, setMaterias] = useState(materiasJson);
  const [selectedAlunos, setSelectedAlunos] = useState([]);
  const [selectedMaterias, setSelectedMaterias] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const novaTurma = {
      nome,
      alunos: selectedAlunos,
      materias: selectedMaterias
    };

    console.log('Nova turma:', novaTurma);
    setSelectedAlunos([])
    setSelectedMaterias([])

    // axios.post('https://api.example.com/turmas', novaTurma)
    //   .then(response => {
    //     console.log('Turma adicionada com sucesso:', response.data);
    //     // Resetar o formulário
    //     setNome('');
    //     setSelectedAlunos([]);
    //     setSelectedMaterias([]);
    //   })
    //   .catch(error => {
    //     console.error('Erro ao adicionar turma:', error);
    //   });
  };

  const handleAlunosChange = (event) => {
    const options = event.target.options;
    const selectedValues = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    setSelectedAlunos(selectedValues);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Adicionar Nova Turma</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">Nome da Turma</label>
          <input
            type="text"
            className="form-control"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="alunos" className="form-label">Alunos</label>
          <select
            multiple
            className="form-control"
            id="alunos"
            value={selectedAlunos}
            onChange={handleAlunosChange}
            required
          >
            {alunos.map(aluno => (
              <option key={aluno._id} value={aluno._id}>{aluno.nome}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="materias" className="form-label">Matérias</label>
          <select
            multiple
            className="form-control"
            id="materias"
            value={selectedMaterias}
            onChange={(e) => setSelectedMaterias([...e.target.selectedOptions].map(option => option.value))}
            required
          >
            {materias.map(materia => (
              <option key={materia._id} value={materia._id}>{materia.nome}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Adicionar Turma</button>
      </form>
    </div>
  );
};

export default Turmas;
