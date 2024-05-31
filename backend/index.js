const express = require('express')
const app = express()

app.use(express.json())

//meotdo get para rota alunos
app.get('/alunos', (req, res) => {
  res.send({aluno: 'João'})
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})