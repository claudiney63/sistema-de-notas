import React, { useState } from 'react';
import turmas from '../data/turmas';

export default function AdicionarAluno() {
  const [nome, setNome] = useState('');
  const [selectedTurma, setSelectedTurma] = useState('');
  const [turno, setTurno] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const novoAluno = {
      nome,
      turma: selectedTurma,
      turno,
      notas: []
    };

    console.log('Novo aluno:', novoAluno);
  };

  return (
    <>
      <div className="container mt-5">
        <h2 className="mb-4">Adicionar Novo Aluno</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nome" className="form-label">Nome do Aluno</label>
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
            <label htmlFor="turma" className="form-label">Turma do Aluno</label>
            <select
              id="turma"
              className="form-select"
              value={selectedTurma}
              onChange={(e) => setSelectedTurma(e.target.value)}
              required
            >
              <option value="" disabled>Selecione uma turma</option>
              {turmas.map((t) => (
                <option key={t._id} value={t.nome}>{t.nome}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="turno" className="form-label">Turno do Aluno</label>
            <select
              id="turno"
              className="form-select"
              value={turno}
              onChange={(e) => setTurno(e.target.value)}
              required
            >
              <option value="" disabled>Selecione um turno</option>
              <option value="manha">Manhã</option>
              <option value="tarde">Tarde</option>
              <option value="noite">Noite</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Adicionar Aluno</button>
        </form>
      </div>
    </>
  );
}
