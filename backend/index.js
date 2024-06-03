const express = require('express')
const moogoos = require('mongoose')
const app = express()

app.use(express.json())

//TODO: Conexão com o banco de dados

//Rotas
const alunoRoutes = require('./routes/alunoRoutes')
const materiaRoutes = require('./routes/materiaRoutes')
const professorRoutes = require('./routes/professorRoutes')
const turmaRoutes = require('./routes/turmaRoutes')

app.use('/alunos', alunoRoutes) 
app.use('/materias', materiaRoutes)
app.use('/professores', professorRoutes)
app.use('/turmas', turmaRoutes)

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})