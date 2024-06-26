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

export default function Home() {
  return (
    <div>
      {/* Conteúdo da Home */}
      <div className="container mt-5">
        <div className="row">
          <ContainerCard
            titulo="Turmas"
            descricao="Acesso a lista de turmas."
            linkRoute="/alunos"
            linkText="Acessar Turmas"
          />
          <ContainerCard
            titulo="Materias"
            descricao="Acesso a lista de materias."
            linkRoute="/materias"
            linkText="Acessar Materias"
          />
        </div>
      </div>
    </div>
  );
}
