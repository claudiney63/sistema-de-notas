import React, { useState, useEffect } from "react";
// import axios from "axios";
import alunos from "../data/alunos.json";
import NavbarComponent from "./NavBar";

const Alunos = () => {
  const [students, setStudents] = useState(alunos);

  const [filteredStudents, setFilteredStudents] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [selectedTurma, setSelectedTurma] = useState("");

  useEffect(() => {
    const studentsData = [...students];
    setStudents(studentsData);
    setFilteredStudents(studentsData);

    // Extraindo as turmas únicas
    const uniqueTurmas = [
      ...new Set(studentsData.map((student) => student.turma)),
    ];
    setTurmas(uniqueTurmas);
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

  return (
    <>
      <NavbarComponent />
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
                {turma}
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
              <tr key={student.nome}>
                <td>{student.nome}</td>
                <td>{student.turma}</td>
                <td>{student.turno}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Alunos;
