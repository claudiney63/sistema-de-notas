import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Materias() {
    const [materias, setMaterias] = useState([]);

    useEffect(() => {
        const fetchMaterias = async () => {
            try {
                const response = await axios.get('https://sistema-de-notas-one.vercel.app/materias');
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
                    <div className="col-md-4" key={materia._id}>
                        <div className="card text-center">
                            <div className="card-body">
                                <h5 className="card-title">
                                    <Link className="" to={`/materias/${materia._id}`}>{materia.nome}</Link>
                                </h5>
                                <p className="card-text">{materia.descricao}</p>
                                <p className="card-text">Professor: {materia.professor.nome}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
