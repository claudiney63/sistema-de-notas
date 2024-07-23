import React from 'react';

function NavbarComponent() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light p-4">
      <a className="navbar-brand fw-bold" href="/">
        Colégio CTE
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link active" href="/">
              Inicio
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/cadastrar-notas">
              Cadastrar Notas
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/adicionar-aluno">
              Cadastrar Aluno
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/adicionar-professor">
              Cadastrar Professor
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/adicionar-turma">
              Cadastrar Turma
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/adicionar-materia">
              Cadastrar Matéria
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavbarComponent;
