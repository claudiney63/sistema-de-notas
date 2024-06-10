import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AdicionarMateria = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [selectedProfessor, setSelectedProfessor] = useState('');
  const [professores, setProfessores] = useState([]);

  useEffect(() => {
    const fetchProfessores = async () => {
      try {
        const response = await axios.get('https://sistema-de-notas-one.vercel.app/professores');
        setProfessores(response.data);
      } catch (error) {
        console.error('Erro ao buscar professores:', error);
      }
    };

    fetchProfessores();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://sistema-de-notas-one.vercel.app/materias', {
        nome: nome,
        descricao: descricao,
        professor: selectedProfessor
      });

      Swal.fire({
        icon: 'success',
        title: 'Matéria Adicionada!',
        showConfirmButton: true
      })
      console.log('Nova matéria adicionada:', response.data);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao adicionar matéria',
        showConfirmButton: true
      })
      console.error('Erro ao adicionar nova matéria:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Adicionar Nova Matéria</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">
            Nome da Matéria
          </label>
          <input
            type="text"
            className="form-control"
            id="nome"
            value={nome}
            required
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="descricao" className="form-label">
            Descrição da Matéria
          </label>
          <input
            type="text"
            className="form-control"
            id="descricao"
            value={descricao}
            onChange={(e) => {
              setDescricao(e.target.value);
            }}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="professor" className="form-label">
            Professor da Matéria
          </label>
          <select
            id="professor"
            className="form-select"
            value={selectedProfessor}
            onChange={(e) => setSelectedProfessor(e.target.value)}
            required
          >
            <option value="">Selecione um professor</option>
            {professores.map((professor) => (
              <option key={professor._id} value={professor._id}>
                {professor.nome}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Adicionar Matéria
        </button>
      </form>
    </div>
  );
};

export default AdicionarMateria;
