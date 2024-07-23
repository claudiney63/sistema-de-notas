import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const AlunoDetalhes = () => {
  const { id } = useParams();
  const [aluno, setAluno] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [alunoResponse] = await Promise.all([
          axios.get(`https://sistema-de-notas-one.vercel.app/alunos/${id}`),
        ]);

        setAluno(alunoResponse.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleEditar = () => {
    navigate(`/editar-aluno/${id}`);
  };

  const handleApagar = () => {
    Swal.fire({
      title: 'Tem certeza?',
      text: "Esta ação não pode ser revertida!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, apagar!',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://sistema-de-notas-one.vercel.app/alunos/${id}`);
          Swal.fire(
            'Apagado!',
            'O aluno foi apagado com sucesso.',
            'success'
          );
          navigate('/alunos');
        } catch (error) {
          console.error("Erro ao apagar aluno:", error);
          Swal.fire(
            'Erro!',
            'Ocorreu um erro ao apagar o aluno.',
            'error'
          );
        }
      }
    });
  };

  const handleImprimir = () => {
    const printContents = document.getElementById("boletim").innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  if (!aluno) {
    return <div>Aluno não encontrado</div>;
  }

  const getNotaStyle = (nota) => ({
    backgroundColor: nota < 6 ? "lightcoral" : "lightblue",
  });

  return (
    <div className="container mt-5">
      <h2 className="mb-4">{aluno.nome}</h2>
      <p><strong>Turma:</strong> {aluno.turma.nome}</p>
      <p><strong>Turno:</strong> {aluno.turno}</p>

      <div className="d-flex justify-content-between">
        <div>
          <button className="btn btn-primary me-2" onClick={handleEditar}>Editar</button>
          <button className="btn btn-danger" onClick={handleApagar}>Apagar</button>
        </div>
        <div>
          <button className="btn btn-success" onClick={handleImprimir}>Imprimir Boletim</button>
        </div>
      </div>

      <style>
        {`
          @media print {
            .print-only {
              display: block;
            }
            .no-print {
              display: none;
            }
          }
          .print-only {
            display: none;
          }
        `}
      </style>

      <div id="boletim">
        <div className="print-only">
        <h3 className="mt-3">Colégio CTE</h3>
        <p><strong>Aluno:</strong> {aluno.nome}</p>
        <p><strong>Turma:</strong> {aluno.turma.nome}</p>
        <p><strong>Turno:</strong> {aluno.turno}</p>
        </div>
        
        <h3 className="mt-3">Notas</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Materia</th>
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
            {aluno.notas.map((nota) => {
              const bimestres = nota.bimestres;
              const mediasBimestrais = bimestres.map((bimestre) => {
                const primeirasNotas = bimestre.notas.slice(0, 2);
                const somaNotas = primeirasNotas.reduce((a, b) => a + b, 0);
                const media = somaNotas / primeirasNotas.length;
                const recuperacaoMaior = bimestre.notas[2] > media;
                return { media: recuperacaoMaior ? bimestre.notas[2] : media, recuperacaoMaior };
              });

              const mediaSemestral1 = (mediasBimestrais[0].media + mediasBimestrais[1].media) / 2;
              const mediaSemestral2 = (mediasBimestrais[2].media + mediasBimestrais[3].media) / 2;
              const mediaFinal = (mediaSemestral1 + mediaSemestral2) / 2;

              return (
                <tr key={nota.materia._id}>
                  <td>{nota.materia.nome}</td>
                  {bimestres.slice(0, 1).map((bimestre, bimestreIndex) => (
                    <React.Fragment key={`bimestre1-${bimestreIndex}`}>
                      {bimestre.notas.map((n, notaIndex) => (
                        <td key={`nota1-${bimestreIndex}-${notaIndex}`}>{n}</td>
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
                      {bimestre.notas.map((n, notaIndex) => (
                        <td key={`nota2-${bimestreIndex}-${notaIndex}`}>{n}</td>
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
                      {bimestre.notas.map((n, notaIndex) => (
                        <td key={`nota3-${bimestreIndex}-${notaIndex}`}>{n}</td>
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
                      {bimestre.notas.map((n, notaIndex) => (
                        <td key={`nota4-${bimestreIndex}-${notaIndex}`}>{n}</td>
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
                  <td style={getNotaStyle(mediaFinal)}>{mediaFinal < 6 ? "R" : "A"}</td>
                  <td>{nota.faltas}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AlunoDetalhes;
