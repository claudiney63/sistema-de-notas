import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AlunoDetalhes = () => {
  const { id } = useParams();
  const [aluno, setAluno] = useState(null);
  const [materias, setMaterias] = useState([]);
  const [turmas, setTurmas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [alunoResponse, materiasResponse, turmasResponse] = await Promise.all([
          axios.get(`https://sistema-de-notas-one.vercel.app/alunos/${id}`),
          axios.get("https://sistema-de-notas-one.vercel.app/materias"),
          axios.get("https://sistema-de-notas-one.vercel.app/turmas"),
        ]);

        setAluno(alunoResponse.data);
        setMaterias(materiasResponse.data);
        setTurmas(turmasResponse.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [id]);

  const nomeMateria = (materiaId) => {
    const materia = materias.find((materia) => materia._id === materiaId);
    return materia ? materia.nome : "Matéria não encontrada";
  };

  const nomeTurma = (turmaId) => {
    const turma = turmas.find((turma) => turma._id === turmaId);
    return turma ? turma.nome : "Turma não encontrada";
  };

  if (!aluno) {
    return <div>Aluno não encontrado</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Detalhes do Aluno: {aluno.nome}</h2>
      <p><strong>Turma:</strong> {aluno.turma.nome}</p>
      <p><strong>Turno:</strong> {aluno.turno}</p>

      <h3>Notas</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Materia</th>
            <th>AV1</th>
            <th>AV2</th>
            <th>MB1</th>
            <th>AV3</th>
            <th>AV4</th>
            <th>MB2</th>
            <th>MS1</th>
            <th>AV5</th>
            <th>AV6</th>
            <th>MB3</th>
            <th>AV7</th>
            <th>AV8</th>
            <th>MB4</th>
            <th>MS2</th>
            <th>MF</th>
          </tr>
        </thead>
        <tbody>
          {aluno.notas.map((nota) => {
            const bimestres = nota.bimestres;
            const mediasBimestrais = bimestres.map(
              (bimestre) =>
                bimestre.notas.reduce((a, b) => a + b, 0) / bimestre.notas.length
            );
            const mediaSemestral1 = (mediasBimestrais[0] + mediasBimestrais[1]) / 2;
            const mediaSemestral2 = (mediasBimestrais[2] + mediasBimestrais[3]) / 2;
            const mediaFinal = (mediaSemestral1 + mediaSemestral2) / 2;

            const getNotaStyle = (nota) => ({
              backgroundColor: nota < 6 ? 'lightcoral' : 'lightblue',
            });

            return (
              <tr key={nota.materia}>
                <td>{nomeMateria(nota.materia)}</td>
                {bimestres.slice(0, 1).map((bimestre, bimestreIndex) => (
                  <React.Fragment key={`bimestre1-${bimestreIndex}`}>
                    {bimestre.notas.map((n, notaIndex) => (
                      <td key={`nota1-${bimestreIndex}-${notaIndex}`}>
                        {n}
                      </td>
                    ))}
                  </React.Fragment>
                ))}
                <td style={getNotaStyle(mediasBimestrais[0])}>{mediasBimestrais[0].toFixed(1)}</td>
                {bimestres.slice(1, 2).map((bimestre, bimestreIndex) => (
                  <React.Fragment key={`bimestre1-${bimestreIndex}`}>
                    {bimestre.notas.map((n, notaIndex) => (
                      <td key={`nota1-${bimestreIndex}-${notaIndex}`}>
                        {n}
                      </td>
                    ))}
                  </React.Fragment>
                ))}
                <td style={getNotaStyle(mediasBimestrais[1])}>{mediasBimestrais[1].toFixed(1)}</td>
                <td style={getNotaStyle(mediaSemestral1)}>{mediaSemestral1.toFixed(1)}</td>
                {bimestres.slice(2, 3).map((bimestre, bimestreIndex) => (
                  <React.Fragment key={`bimestre2-${bimestreIndex}`}>
                    {bimestre.notas.map((n, notaIndex) => (
                      <td key={`nota2-${bimestreIndex}-${notaIndex}`}>
                        {n}
                      </td>
                    ))}
                  </React.Fragment>
                ))}
                <td style={getNotaStyle(mediasBimestrais[2])}>{mediasBimestrais[2].toFixed(1)}</td>
                {bimestres.slice(3, 4).map((bimestre, bimestreIndex) => (
                  <React.Fragment key={`bimestre2-${bimestreIndex}`}>
                    {bimestre.notas.map((n, notaIndex) => (
                      <td key={`nota2-${bimestreIndex}-${notaIndex}`}>
                        {n}
                      </td>
                    ))}
                  </React.Fragment>
                ))}
                <td style={getNotaStyle(mediasBimestrais[3])}>{mediasBimestrais[3].toFixed(1)}</td>
                <td style={getNotaStyle(mediaSemestral2)}>{mediaSemestral2.toFixed(1)}</td>
                <td style={getNotaStyle(mediaFinal)}>{mediaFinal.toFixed(1)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AlunoDetalhes;
