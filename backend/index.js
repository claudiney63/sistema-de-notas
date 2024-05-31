const express = require('express')
const moogoos = require('mongoose')
const app = express()

app.use(express.json())

//TODO: Conexão com o banco de dados

//Rotas
const alunoRoutes = require('./routes/alunoRoutes')

app.use('/alunos', alunoRoutes) 

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})