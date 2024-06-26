import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Alunos from './components/Alunos';
import AdicionarTurma from './components/AdicionarTurma';
import AdicionarProfessor from './components/AdicionarProfessor';
import AdicionarMateria from './components/AdicionarMateria';
import AdicionarAluno from './components/AdicionarAlunos';
import NavbarComponent from './components/NavBar';
import Materias from './components/Materias';
import MateriaDetalhes from './components/MateriaDetalhes';
import AlunoDetalhes from './components/AlunoDetalhes';
import CadastrarNotas from './components/CadastrarNotas';
import EditarAluno from './components/EditarAluno';

function App() {
  return (
    <Router>
      <NavbarComponent />
      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/alunos" element={<Alunos />} />
          <Route path="/adicionar-turma" element={<AdicionarTurma />} />
          <Route path="/adicionar-professor" element={<AdicionarProfessor />} />
          <Route path="/adicionar-materia" element={<AdicionarMateria />} />
          <Route path="/adicionar-aluno" element={<AdicionarAluno />} />
          <Route path="/materias" element={<Materias />} />
          <Route path="/materias/:id" element={<MateriaDetalhes />} />
          <Route path="/aluno/:id" element={<AlunoDetalhes />} />
          <Route path="/cadastrar-notas" element={<CadastrarNotas />} />
          <Route path="/editar-aluno/:id" element={<EditarAluno />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
