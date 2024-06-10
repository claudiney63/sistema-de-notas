import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Alunos = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [selectedTurma, setSelectedTurma] = useState("");
  const navigate = useNavigate();

  const alunoTurma = (alunoId) => {
    const aluno = students.find((aluno) => aluno._id === alunoId);
    const turma = turmas.find((turma) => turma._id === aluno.turma);
    return turma ? turma.nome : "Turma não encontrada";
  };

  const nomeTurma = (turmaId) => {
    const turma = turmas.find((turma) => turma._id === turmaId);
    return turma ? turma.nome : "Turma não encontrada";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://sistema-de-notas-one.vercel.app/alunos");
        const data = response.data;
        setStudents(data);
        setFilteredStudents(data);

        const uniqueTurmas = [
          ...new Set(data.map((student) => student.turma)),
        ];
        setTurmas(uniqueTurmas);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  const handleTurmaChange = (event) => {
    const turma = event.target.value;
    setSelectedTurma(turma);
    if (turma === "") {
      setFilteredStudents(students);
    } else {
      setFilteredStudents(
        students.filter((student) => student.turma === turma)
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
          {turmas.map((turma) => (
            <option key={turma} value={turma}>
              {nomeTurma(turma)}
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
          {filteredStudents.map((student) => (
            <tr
              key={student._id}
              onClick={() => handleRowClick(student._id)}
              style={{ cursor: "pointer" }}
            >
              <td>{student.nome}</td>
              <td>{alunoTurma(student._id)}</td>
              <td>{student.turno}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Alunos;
