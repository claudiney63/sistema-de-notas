import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function InputNotas({ label, value, onChange }) {
  return (
    <InputGroup>
      <InputGroup.Text id="basic-addon1">{label}</InputGroup.Text>
      <Form.Control
        placeholder={"Não Cadastrada"}
        aria-label={label}
        aria-describedby="basic-addon1"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type="number"
      />
    </InputGroup>
    // <input
    //   type="number"
    //   className="form-control"
    //   placeholder={label}
    //   value={value}
    //   onChange={(e) => onChange(e.target.value)}
    //   required
    // />
  );
}

export default function CadastrarNotas() {
  const [alunos, setAlunos] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [alunoId, setAlunoId] = useState("");
  const [materiaId, setMateriaId] = useState("");

  const [nota1B1, setNota1B1] = useState("");
  const [nota2B1, setNota2B1] = useState("");
  const [notaRecB1, setNotaRecB1] = useState("");

  const [nota1B2, setNota1B2] = useState("");
  const [nota2B2, setNota2B2] = useState("");
  const [notaRecB2, setNotaRecB2] = useState("");

  const [nota1B3, setNota1B3] = useState("");
  const [nota2B3, setNota2B3] = useState("");
  const [notaRecB3, setNotaRecB3] = useState("");

  const [nota1B4, setNota1B4] = useState("");
  const [nota2B4, setNota2B4] = useState("");
  const [notaRecB4, setNotaRecB4] = useState("");

  const [faltas, setFaltas] = useState("");

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const response = await axios.get(
          "https://sistema-de-notas-one.vercel.app/alunos"
        );
        setAlunos(response.data);
      } catch (error) {
        console.error("Erro ao buscar alunos:", error);
      }
    };

    const fetchMaterias = async () => {
      try {
        const response = await axios.get(
          "https://sistema-de-notas-one.vercel.app/materias"
        );
        setMaterias(response.data);
      } catch (error) {
        console.error("Erro ao buscar matérias:", error);
      }
    };

    fetchAlunos();
    fetchMaterias();
  }, []);

  useEffect(() => {
    const fetchNotas = async () => {
      if (alunoId && materiaId) {
        try {
          const response = await axios.get(
            `https://sistema-de-notas-one.vercel.app/alunos/${alunoId}`
          );
          const aluno = response.data;

          const nota = aluno.notas.find((n) => n.materia._id === materiaId);
          console.log(nota)
          if (nota) {
            setNota1B1(nota.bimestres[0]?.notas[0] || "");
            setNota2B1(nota.bimestres[0]?.notas[1] || "");
            setNotaRecB1(nota.bimestres[0]?.notas[2] || "");
            setNota1B2(nota.bimestres[1]?.notas[0] || "");
            setNota2B2(nota.bimestres[1]?.notas[1] || "");
            setNotaRecB2(nota.bimestres[1]?.notas[2] || "");
            setNota1B3(nota.bimestres[2]?.notas[0] || "");
            setNota2B3(nota.bimestres[2]?.notas[1] || "");
            setNotaRecB3(nota.bimestres[2]?.notas[2] || "");
            setNota1B4(nota.bimestres[3]?.notas[0] || "");
            setNota2B4(nota.bimestres[3]?.notas[1] || "");
            setNotaRecB4(nota.bimestres[3]?.notas[2] || "");
            setFaltas(nota.faltas || "");
          } else {
            // Se não houver notas para a matéria selecionada, limpe os campos
            setNota1B1("");
            setNota2B1("");
            setNotaRecB1("");
            setNota1B2("");
            setNota2B2("");
            setNotaRecB2("");
            setNota1B3("");
            setNota2B3("");
            setNotaRecB3("");
            setNota1B4("");
            setNota2B4("");
            setNotaRecB4("");
            setFaltas("");
          }
        } catch (error) {
          console.error("Erro ao buscar notas:", error);
        }
      }
    };

    fetchNotas();
  }, [alunoId, materiaId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const notasBimestrais = [
        [nota1B1, nota2B1, notaRecB1],
        [nota1B2, nota2B2, notaRecB2],
        [nota1B3, nota2B3, notaRecB3],
        [nota1B4, nota2B4, notaRecB4],
      ];

      const response = await axios.post(
        "https://sistema-de-notas-one.vercel.app/alunos/addNota",
        {
          alunoId: alunoId,
          materiaId: materiaId,
          notas: notasBimestrais,
          faltas: faltas,
        }
      );

      Swal.fire({
        icon: "success",
        title: "Notas cadastradas com sucesso!",
        button: "Fechar",
      });
      console.log("Notas cadastradas com sucesso:", response.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erro ao cadastrar notas!",
        button: "Fechar",
      });
      console.error("Erro ao cadastrar notas:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Cadastrar/Atualizar Notas</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="aluno" className="form-label">
            Aluno
          </label>
          <select
            id="aluno"
            className="form-select"
            value={alunoId}
            onChange={(e) => setAlunoId(e.target.value)}
            required
          >
            <option value="" disabled>
              Selecione um aluno
            </option>
            {alunos.map((aluno) => (
              <option key={aluno._id} value={aluno._id}>
                {aluno.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="materia" className="form-label">
            Matéria
          </label>
          <select
            id="materia"
            className="form-select"
            value={materiaId}
            onChange={(e) => setMateriaId(e.target.value)}
            required
          >
            <option value="" disabled>
              Selecione uma matéria
            </option>
            {materias.map((materia) => (
              <option key={materia._id} value={materia._id}>
                {materia.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Notas Bimestrais</label>
          <div className="row">
            <div className="col">
              <InputNotas label={"AV1"} value={nota1B1} onChange={setNota1B1} />
            </div>
            <div className="col">
              <InputNotas label={"AV2"} value={nota2B1} onChange={setNota2B1} />
            </div>
            <div className="col">
              <InputNotas
                label={"RB1"}
                value={notaRecB1}
                onChange={setNotaRecB1}
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <InputNotas label={"AV3"} value={nota1B2} onChange={setNota1B2} />
            </div>
            <div className="col">
              <InputNotas label={"AV4"} value={nota2B2} onChange={setNota2B2} />
            </div>
            <div className="col">
              <InputNotas
                label={"RB2"}
                value={notaRecB2}
                onChange={setNotaRecB2}
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <InputNotas label={"AV5"} value={nota1B3} onChange={setNota1B3} />
            </div>
            <div className="col">
              <InputNotas label={"AV6"} value={nota2B3} onChange={setNota2B3} />
            </div>
            <div className="col">
              <InputNotas
                label={"RB3"}
                value={notaRecB1}
                onChange={setNotaRecB3}
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <InputNotas label={"AV7"} value={nota1B4} onChange={setNota1B4} />
            </div>
            <div className="col">
              <InputNotas label={"AV8"} value={nota2B4} onChange={setNota2B4} />
            </div>
            <div className="col">
              <InputNotas
                label={"RB4"}
                value={notaRecB4}
                onChange={setNotaRecB4}
              />
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="faltas" className="form-label">
            Faltas
          </label>
          <input
            type="number"
            className="form-control"
            id="faltas"
            value={faltas}
            onChange={(e) => setFaltas(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Cadastrar/Atualizar Notas
        </button>
      </form>
    </div>
  );
}
