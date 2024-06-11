import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const EditarAluno = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [aluno, setAluno] = useState(null);
  const [nome, setNome] = useState("");
  const [turma, setTurma] = useState("");
  const [turno, setTurno] = useState("");
  const [turmasDisponiveis, setTurmasDisponiveis] = useState([]);
//   const [turnosDisponiveis, setTurnosDisponiveis] = useState(["Manhã", "Tarde", "Noite"]);

  useEffect(() => {
    const fetchAluno = async () => {
      try {
        const response = await axios.get(
          `https://sistema-de-notas-one.vercel.app/alunos/${id}`
        );
        setAluno(response.data);
        setNome(response.data.nome);
        setTurma(response.data.turma.nome);
        setTurno(response.data.turno);
      } catch (error) {
        console.error("Erro ao buscar aluno:", error);
      }
    };

    const fetchTurmasDisponiveis = async () => {
      try {
        const response = await axios.get(
          "https://sistema-de-notas-one.vercel.app/turmas"
        );
        setTurmasDisponiveis(response.data);
      } catch (error) {
        console.error("Erro ao buscar turmas:", error);
      }
    };

    fetchAluno();
    fetchTurmasDisponiveis();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Nome:", nome, "Turma:", turma, "Turno:", turno);

    try {
      await axios.put(`https://sistema-de-notas-one.vercel.app/alunos/${id}`, {
        nome: nome,
        turma: turma,
        turno: turno,
      });

      Swal.fire({
        icon: "success",
        title: "Aluno atualizado com sucesso!",
        button: "Fechar",
      });

      navigate(`/aluno/${id}`);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erro ao atualizar aluno!",
        button: "Fechar",
      });
      console.error("Erro ao atualizar aluno:", error);
    }
  };

  if (!aluno) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Editar Aluno: {aluno.nome}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">
            Nome
          </label>
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
          <label htmlFor="turma" className="form-label">
            Turma
          </label>
          <select
            className="form-select"
            id="turma"
            value={turma}
            onChange={(e) => setTurma(e.target.value)}
            required
          >
            <option value="" disabled>
              Selecione a turma
            </option>
            {turmasDisponiveis.map((turma) => (
              <option key={turma.id} value={turma._id}>
                {turma.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="turno" className="form-label">
            Turno
          </label>
          <select
            className="form-select"
            id="turno"
            value={turno}
            onChange={(e) => setTurno(e.target.value)}
            required
          >
            <option value="" disabled>
              Selecione o turno
            </option>
            {["Manhã", "Tarde", "Noite"].map((turno) => (
              <option key={turno} value={turno}>
                {turno}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Salvar
        </button>
      </form>
    </div>
  );
};

export default EditarAluno;
