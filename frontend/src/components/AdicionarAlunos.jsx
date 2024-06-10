import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function AdicionarAluno() {
  const [nome, setNome] = useState('');
  const [selectedTurma, setSelectedTurma] = useState('');
  const [turno, setTurno] = useState('');
  const [turmas, setTurmas] = useState([]);

  useEffect(() => {
    const fetchTurmas = async () => {
      try {
        const response = await axios.get('https://sistema-de-notas-one.vercel.app/turmas');
        setTurmas(response.data);
      } catch (error) {
        console.error('Erro ao buscar turmas:', error);
      }
    };

    fetchTurmas();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://sistema-de-notas-one.vercel.app/alunos', {
        nome: nome,
        turma: selectedTurma,
        turno: turno,
        notas: []
      });

      Swal.fire({
        icon: 'success',
        title: 'Aluno Adicionado!',
        showConfirmButton: true
      })
      console.log('Novo aluno adicionado:', response.data);
      
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao adicionar aluno',
        showConfirmButton: true
      })
      console.error('Erro ao adicionar novo aluno:', error);
    }
  };

  return (
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
            {turmas.map((turma) => (
              <option key={turma._id} value={turma._id}>{turma.nome}</option>
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
            <option value="Manhã">Manhã</option>
            <option value="Tarde">Tarde</option>
            <option value="Noite">Noite</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Adicionar Aluno</button>
      </form>
    </div>
  );
}
