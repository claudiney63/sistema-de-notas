import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Alunos = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [selectedTurma, setSelectedTurma] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [alunosResponse, turmasResponse] = await Promise.all([
          axios.get("https://sistema-de-notas-one.vercel.app/alunos"),
          axios.get("https://sistema-de-notas-one.vercel.app/turmas"),
        ]);

        const alunosData = alunosResponse.data;
        const turmasData = turmasResponse.data;

        setStudents(alunosData);
        setFilteredStudents(alunosData);
        setTurmas(turmasData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  const handleTurmaChange = (event) => {
    const turma = event.target.value;
    console.log("turma", turma);
    setSelectedTurma(turma);
    if (turma === "") {
      setFilteredStudents(students);
    } else {
      setFilteredStudents(
        students.filter((student) => student.turma._id === turma)
      );
    }
  };

  const handleRowClick = (studentId) => {
    navigate(`/aluno/${studentId}`);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Lista de Alunos</h2>

      <div className="mb-3">
        <label htmlFor="turmaFilter" className="form-label">
          Filtrar por Turma:
        </label>
        <select
          id="turmaFilter"
          className="form-select"
          value={selectedTurma}
          onChange={handleTurmaChange}
        >
          <option value="">Todas as Turmas</option>
          {turmas
            .slice() // Faz uma cópia do array para evitar mutações
            .sort((a, b) => a.nome.localeCompare(b.nome)) // Ordena as turmas por nome
            .map((turma) => (
              <option key={turma._id} value={turma._id}>
                {turma.nome}
              </option>
            ))}
        </select>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Turma</th>
            <th>Turno</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents
            .slice() // Faz uma cópia do array para evitar mutações
            .sort((a, b) => a.nome.localeCompare(b.nome)) // Ordena os alunos por nome
            .map((student) => (
              <tr
                key={student._id}
                onClick={() => handleRowClick(student._id)}
                style={{ cursor: "pointer" }}
              >
                <td>{student.nome}</td>
                <td>{student.turma.nome}</td>
                <td>{student.turno}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Alunos;
