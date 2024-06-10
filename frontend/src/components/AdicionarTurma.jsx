import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AdicionarTurma = () => {
  const [nome, setNome] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://sistema-de-notas-one.vercel.app/turmas', {
        nome: nome
      });

      Swal.fire({
        icon: 'success',
        title: 'Turma Adicionada!',
        showConfirmButton: true
      })
      console.log('Nova turma adicionada:', response.data);
    } catch (error) {
      console.error('Erro ao adicionar nova turma:', error);
    }
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
