import React from 'react';
import { Link } from 'react-router-dom';
import materias from '../data/materias.json';

export default function Materias() {
    return (
        <>
            <div className="container mt-5">
                <h2 className="mb-4">Materias</h2>
                <div className="row">
                    {materias.map((materia) => (
                        <div className="col-md-4" key={materia._id}>
                            <div className="card text-center">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        <Link className="" to={`/materias/${materia._id}`}>{materia.nome}</Link>
                                    </h5>
                                    <p className="card-text">{materia.descricao}</p>
                                    <p className="card-text">Professor: {materia.professor}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
