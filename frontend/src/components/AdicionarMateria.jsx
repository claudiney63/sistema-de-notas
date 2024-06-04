import professores from "../data/professores";
import { useState } from "react";
import NavbarComponent from "./NavBar";

export default function AdicionarMateria() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [professor, setProfessor] = useState(professores);

  const handleSubmit = (event) => {
    event.preventDefault();

    const novaMateria = {
      nome,
      descricao,
      professor: professor.find(
        (professor) => professor.name === event.target.professor.value
      ),
    };

    console.log("Nova matéria:", novaMateria);
  }

  return (
    <>
      <NavbarComponent />
      <div className="container mt-5">
        <h2 className="mb-4">Adicionar Nova Matéria</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nome" className="form-label">
              Nome da Matéria
            </label>
            <input type="text" className="form-control" id="nome" value={nome} required onChange={(e) => setNome(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="descricao" className="form-label">
              Descrição da Matéria
            </label>
            <input
              type="text"
              className="form-control"
              id="descricao"
              value={descricao}
              onChange={(e) => {
                setDescricao(e.target.value);
              }}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="professor" className="form-label">
              Professor da Matéria
            </label>
            <select id="professor" className="form-select" required>
              {professor.map((professor) => (
                <option key={professor.name} value={professor.name}>
                  {professor.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Adicionar Matéria
          </button>
        </form>
      </div>
    </>
  );
}
