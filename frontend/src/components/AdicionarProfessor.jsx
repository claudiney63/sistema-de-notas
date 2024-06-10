import React, { useState } from "react";

export default function AdicionarProfessor() {
  const [nome, setNome] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const novoProfessor = {
      nome,
    };

    console.log("Novo professor:", novoProfessor);
  };

  return (
    <>
      <div className="container mt-5">
        <h2 className="mb-4">Adicionar Novo Professor</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nome" className="form-label">
              Nome do Professor
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
          <button type="submit" className="btn btn-primary">
            Adicionar Professor
          </button>
        </form>
      </div>
    </>
  );
}
