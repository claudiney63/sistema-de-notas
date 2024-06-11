import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function MateriaDetalhes() {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
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

  console.log("alunos", alunos);

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

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleNotaChange = (alunoId, bimestreIndex, notaIndex, newNota) => {
    setAlunos((prevAlunos) =>
      prevAlunos.map((aluno) => {
        if (aluno._id === alunoId) {
          const notasAtualizadas = aluno.notas.map((nota) => {
            if (nota.materia === id) {
              const bimestresAtualizados = nota.bimestres.map(
                (bimestre, index) => {
                  if (index === bimestreIndex) {
                    const notasBimestreAtualizadas = bimestre.notas.map(
                      (n, idx) => (idx === notaIndex ? parseFloat(newNota) : n)
                    );
                    const mediaBimestral =
                      notasBimestreAtualizadas.reduce((a, b) => a + b, 0) /
                      notasBimestreAtualizadas.length;
                    return {
                      ...bimestre,
                      notas: notasBimestreAtualizadas,
                      media: mediaBimestral,
                    };
                  }
                  return bimestre;
                }
              );
              return {
                ...nota,
                bimestres: bimestresAtualizados,
              };
            }
            return nota;
          });
          return { ...aluno, notas: notasAtualizadas };
        }
        return aluno;
      })
    );
  };

  const getNotaStyle = (nota) => ({
    backgroundColor: nota < 6 ? 'lightcoral' : 'lightblue',
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
        {/* <button
          className="btn btn-primary"
          onClick={handleEditToggle}
        >
          {isEditing ? "Salvar Notas" : "Editar Notas"}
        </button> */}
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
      <>
        {isEditing && (
          <p className="text-danger">
            Cuidado! As alterações feitas nas notas são salvas automaticamente.
          </p>
        )}
      </>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Turma</th>
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
            <th>Resultado</th>
          </tr>
        </thead>
        <tbody>
          {console.log(turmasFiltradas)}
          {turmasFiltradas.map((aluno) => {
            const notasMateria = aluno.notas.find((nota) => nota.materia._id === id);
            const bimestres = notasMateria.bimestres;
            const mediasBimestrais = bimestres.map(
              (bimestre) =>
                bimestre.notas.reduce((a, b) => a + b, 0) / bimestre.notas.length
            );
            const mediaSemestral1 = (mediasBimestrais[0] + mediasBimestrais[1]) / 2;
            const mediaSemestral2 = (mediasBimestrais[2] + mediasBimestrais[3]) / 2;
            const mediaFinal = (mediaSemestral1 + mediaSemestral2) / 2;

            return (
              <tr key={aluno._id}>
                <td>{aluno.nome}</td>
                <td>{alunoTurma(aluno._id)}</td>
                {bimestres.slice(0, 1).map((bimestre, bimestreIndex) => (
                  <React.Fragment key={`bimestre1-${bimestreIndex}`}>
                    {bimestre.notas.map((nota, notaIndex) => (
                      <td key={`nota1-${bimestreIndex}-${notaIndex}`}>
                        {isEditing ? (
                          <input
                            type="number"
                            value={nota}
                            onChange={(e) =>
                              handleNotaChange(
                                aluno._id,
                                bimestreIndex,
                                notaIndex,
                                e.target.value
                              )
                            }
                            style={{ width: "50px" }}
                          />
                        ) : (
                          nota
                        )}
                      </td>
                    ))}
                  </React.Fragment>
                ))}
                <td style={getNotaStyle(mediasBimestrais[0])}>{mediasBimestrais[0].toFixed(1)}</td>
                {bimestres.slice(1, 2).map((bimestre, bimestreIndex) => (
                  <React.Fragment key={`bimestre2-${bimestreIndex}`}>
                    {bimestre.notas.map((nota, notaIndex) => (
                      <td key={`nota2-${bimestreIndex}-${notaIndex}`}>
                        {isEditing ? (
                          <input
                            type="number"
                            value={nota}
                            onChange={(e) =>
                              handleNotaChange(
                                aluno._id,
                                bimestreIndex + 2,
                                notaIndex,
                                e.target.value
                              )
                            }
                            style={{ width: "50px" }}
                          />
                        ) : (
                          nota
                        )}
                      </td>
                    ))}
                  </React.Fragment>
                ))}
                <td style={getNotaStyle(mediasBimestrais[1])}>{mediasBimestrais[1].toFixed(1)}</td>
                <td style={getNotaStyle(mediaSemestral1)}>{mediaSemestral1.toFixed(1)}</td>
                {bimestres.slice(2, 3).map((bimestre, bimestreIndex) => (
                  <React.Fragment key={`bimestre3-${bimestreIndex}`}>
                    {bimestre.notas.map((nota, notaIndex) => (
                      <td key={`nota3-${bimestreIndex}-${notaIndex}`}>
                        {isEditing ? (
                          <input
                            type="number"
                            value={nota}
                            onChange={(e) =>
                              handleNotaChange(
                                aluno._id,
                                bimestreIndex + 4,
                                notaIndex,
                                e.target.value
                              )
                            }
                            style={{ width: "50px" }}
                          />
                        ) : (
                          nota
                        )}
                      </td>
                    ))}
                  </React.Fragment>
                ))}
                <td style={getNotaStyle(mediasBimestrais[2])}>{mediasBimestrais[2].toFixed(1)}</td>
                {bimestres.slice(3, 4).map((bimestre, bimestreIndex) => (
                  <React.Fragment key={`bimestre4-${bimestreIndex}`}>
                    {bimestre.notas.map((nota, notaIndex) => (
                      <td key={`nota4-${bimestreIndex}-${notaIndex}`}>
                        {isEditing ? (
                          <input
                            type="number"
                            value={nota}
                            onChange={(e) =>
                              handleNotaChange(
                                aluno._id,
                                bimestreIndex + 6,
                                notaIndex,
                                e.target.value
                              )
                            }
                            style={{ width: "50px" }}
                          />
                        ) : (
                          nota
                        )}
                      </td>
                    ))}
                  </React.Fragment>
                ))}
                <td style={getNotaStyle(mediasBimestrais[3])}>{mediasBimestrais[3].toFixed(1)}</td>
                <td style={getNotaStyle(mediaSemestral2)}>{mediaSemestral2.toFixed(1)}</td>
                <td style={getNotaStyle(mediaFinal)}>{mediaFinal.toFixed(1)}</td>
                <td style={getNotaStyle(mediaFinal)}>{mediaFinal >= 6.0 ? "Aprovado" : "Reprovado"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
