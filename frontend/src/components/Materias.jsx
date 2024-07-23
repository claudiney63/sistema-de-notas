import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const MAX_LENGTH = 200; // Defina o limite de caracteres desejado

function Description({ text }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (text.length <= MAX_LENGTH) {
    return <p className="card-text">{text}</p>;
  }

  const truncatedText = text.substring(0, MAX_LENGTH) + "...";

  return (
    <>
      <p className="card-text">
        {isExpanded ? text : truncatedText}
        {text.length > MAX_LENGTH && (
          <button
            className="btn btn-link"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Ler menos" : "Ler mais"}
          </button>
        )}
      </p>
    </>
  );
}

export default function Materias() {
  const [materias, setMaterias] = useState([]);

  useEffect(() => {
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

    fetchMaterias();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Materias</h2>
      <div className="row">
        {materias.map((materia) => (
          <div className="col-md-4 mb-3" key={materia._id}>
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title">
                  <Link to={`/materias/${materia._id}`}>{materia.nome}</Link>
                </h5>
                <Description text={materia.descricao} />
                <p className="card-text">
                  <strong>Professor:</strong> {materia.professor.nome}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
