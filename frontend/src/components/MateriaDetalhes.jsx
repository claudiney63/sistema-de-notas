import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function MateriaDetalhes() {
  const { id } = useParams();
  const [alunos, setAlunos] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [turmaSelecionada, setTurmaSelecionada] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [alunosResponse, turmasResponse, materiasResponse] = await Promise.all([
          axios.get("https://sistema-de-notas-one.vercel.app/alunos"),
          axios.get("https://sistema-de-notas-one.vercel.app/turmas"),
          axios.get("https://sistema-de-notas-one.vercel.app/materias"),
        ]);
        setAlunos(alunosResponse.data);
        setTurmas(turmasResponse.data);
        setMaterias(materiasResponse.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  const alunosDaMateria = alunos.filter((aluno) =>
    aluno.notas.some((nota) => nota.materia._id === id)
  );

  const alunoTurma = (alunoId) => {
    const aluno = alunos.find((aluno) => aluno._id === alunoId);
    const turma = turmas.find((turma) => turma._id === aluno.turma._id);
    return turma ? turma.nome : "Turma não encontrada";
  };

  const nomeMateria = (materiaId) => {
    const materia = materias.find((materia) => materia._id === materiaId);
    return materia ? materia.nome : "Materia não encontrada";
  };

  const getNotaStyle = (nota) => ({
    backgroundColor: nota < 6 ? "lightcoral" : "lightblue",
  });

  const handleTurmaChange = (event) => {
    setTurmaSelecionada(event.target.value);
  };

  const turmasFiltradas = turmaSelecionada
    ? alunosDaMateria.filter((aluno) => aluno.turma._id === turmaSelecionada)
    : alunosDaMateria;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Alunos Matriculados em {nomeMateria(id)}</h2>
      <div className="mb-3 d-flex justify-content-between">
        <select
          className="form-select w-auto"
          value={turmaSelecionada}
          onChange={handleTurmaChange}
        >
          <option value="">Todas as Turmas</option>
          {turmas.map((turma) => (
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
            <th>AV1</th>
            <th>AV2</th>
            <th>RB1</th>
            <th>MB1</th>
            <th>AV3</th>
            <th>AV4</th>
            <th>RB2</th>
            <th>MB2</th>
            <th>MS1</th>
            <th>AV5</th>
            <th>AV6</th>
            <th>RB3</th>
            <th>MB3</th>
            <th>AV7</th>
            <th>AV8</th>
            <th>RB4</th>
            <th>MB4</th>
            <th>MS2</th>
            <th>MF</th>
            <th>R</th>
            <th>F</th>
          </tr>
        </thead>
        <tbody>
          {turmasFiltradas.map((aluno) => {
            const notasMateria = aluno.notas.find((nota) => nota.materia._id === id);
            const bimestres = notasMateria.bimestres;
            const mediasBimestrais = bimestres.map((bimestre) => {
              // Pega as duas primeiras notas
              const primeirasNotas = bimestre.notas.slice(0, 2);
              // Calcula a média das duas primeiras notas
              const somaNotas = primeirasNotas.reduce((a, b) => a + b, 0);
              const media = somaNotas / primeirasNotas.length; // Calcula a média
              // Verifica se a nota de recuperação é maior que a média
              const recuperacaoMaior = bimestre.notas[2] > media;
              // Substitui a média pela nota de recuperação se esta for maior
              return { media: recuperacaoMaior ? bimestre.notas[2] : media, recuperacaoMaior };
            });

            const mediaSemestral1 = (mediasBimestrais[0].media + mediasBimestrais[1].media) / 2;
            const mediaSemestral2 = (mediasBimestrais[2].media + mediasBimestrais[3].media) / 2;
            const mediaFinal = (mediaSemestral1 + mediaSemestral2) / 2;

            return (
              <tr key={aluno._id}>
                <td>{aluno.nome}</td>
                <td>{alunoTurma(aluno._id)}</td>
                {bimestres.slice(0, 1).map((bimestre, bimestreIndex) => (
                  <React.Fragment key={`bimestre1-${bimestreIndex}`}>
                    {bimestre.notas.map((nota, notaIndex) => (
                      <td key={`nota1-${bimestreIndex}-${notaIndex}`}>{nota}</td>
                    ))}
                  </React.Fragment>
                ))}
                <td
                  style={{
                    ...getNotaStyle(mediasBimestrais[0].media),
                    backgroundColor: mediasBimestrais[0].recuperacaoMaior ? "yellow" : getNotaStyle(mediasBimestrais[0].media).backgroundColor,
                  }}
                >
                  {mediasBimestrais[0].media.toFixed(1)}
                </td>
                {bimestres.slice(1, 2).map((bimestre, bimestreIndex) => (
                  <React.Fragment key={`bimestre2-${bimestreIndex}`}>
                    {bimestre.notas.map((nota, notaIndex) => (
                      <td key={`nota2-${bimestreIndex}-${notaIndex}`}>{nota}</td>
                    ))}
                  </React.Fragment>
                ))}
                <td
                  style={{
                    ...getNotaStyle(mediasBimestrais[1].media),
                    backgroundColor: mediasBimestrais[1].recuperacaoMaior ? "yellow" : getNotaStyle(mediasBimestrais[1].media).backgroundColor,
                  }}
                >
                  {mediasBimestrais[1].media.toFixed(1)}
                </td>
                <td style={getNotaStyle(mediaSemestral1)}>{mediaSemestral1.toFixed(1)}</td>
                {bimestres.slice(2, 3).map((bimestre, bimestreIndex) => (
                  <React.Fragment key={`bimestre3-${bimestreIndex}`}>
                    {bimestre.notas.map((nota, notaIndex) => (
                      <td key={`nota3-${bimestreIndex}-${notaIndex}`}>{nota}</td>
                    ))}
                  </React.Fragment>
                ))}
                <td
                  style={{
                    ...getNotaStyle(mediasBimestrais[2].media),
                    backgroundColor: mediasBimestrais[2].recuperacaoMaior ? "yellow" : getNotaStyle(mediasBimestrais[2].media).backgroundColor,
                  }}
                >
                  {mediasBimestrais[2].media.toFixed(1)}
                </td>
                {bimestres.slice(3, 4).map((bimestre, bimestreIndex) => (
                  <React.Fragment key={`bimestre4-${bimestreIndex}`}>
                    {bimestre.notas.map((nota, notaIndex) => (
                      <td key={`nota4-${bimestreIndex}-${notaIndex}`}>{nota}</td>
                    ))}
                  </React.Fragment>
                ))}
                <td
                  style={{
                    ...getNotaStyle(mediasBimestrais[3].media),
                    backgroundColor: mediasBimestrais[3].recuperacaoMaior ? "yellow" : getNotaStyle(mediasBimestrais[3].media).backgroundColor,
                  }}
                >
                  {mediasBimestrais[3].media.toFixed(1)}
                </td>
                <td style={getNotaStyle(mediaSemestral2)}>{mediaSemestral2.toFixed(1)}</td>
                <td style={getNotaStyle(mediaFinal)}>{mediaFinal.toFixed(1)}</td>
                <td style={getNotaStyle(mediaFinal)}>{mediaFinal >= 6.0 ? "A" : "R"}</td>
                <td>{notasMateria.faltas}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
