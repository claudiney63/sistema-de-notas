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

export default NavbarComponent;
