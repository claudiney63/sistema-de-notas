import React from "react";

function ContainerCard(props) {
  return (
    <div className="col-md-6">
      <div className="card text-center">
        <div className="card-body">
          <h5 className="card-title">{props.titulo}</h5>
          <p className="card-text">{props.descricao}</p>
          <a href={props.linkRoute} className="btn btn-primary">
            {props.linkText}
          </a>
        </div>
      </div>
    </div>
  );
}

function NavbarComponent() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light p-4">
      <a className="navbar-brand fw-bold" href="#">
        Colegio CTE
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="#">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Cadastrar Notas
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Cadastrar Aluno
            </a>
          </li>
          <li>
            <a className="nav-link" href="#">
              Cadastrar Professor
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default function Home() {
  return (
    <div>
      {/* Navbar */}
      <NavbarComponent />

      {/* Conteúdo da Home */}
      <div className="container mt-5">
        <div className="row">
          <ContainerCard
            titulo="Turmas"
            descricao="Acesso a lista de turmas."
            linkRoute="/rota1"
            linkText="Acessar Turmas"
          />
          <ContainerCard
            titulo="Materias"
            descricao="Acesso a lista de materias."
            linkRoute="/rota2"
            linkText="Acessar Materias"
          />
        </div>
      </div>
    </div>
  );
}
