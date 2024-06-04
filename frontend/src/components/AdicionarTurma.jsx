import React, { useState } from 'react';

const AdicionarTurma = () => {
  const [nome, setNome] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const novaTurma = {
      nome,
    };

    console.log('Nova turma:', novaTurma);
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
        <button type="submit" className="btn btn-primary">Adicionar Turma</button>
      </form>
    </div>
  );
};

export default AdicionarTurma;
