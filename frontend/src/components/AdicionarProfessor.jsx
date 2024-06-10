import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function AdicionarProfessor() {
  const [nome, setNome] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("https://sistema-de-notas-one.vercel.app/professores", {
        nome: nome
      });

      Swal.fire({
        icon: "success",
        title: "Professor Adicionado!",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log("Novo professor adicionado:", response.data);
    } catch (error) {
      console.error("Erro ao adicionar novo professor:", error);
    }
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
