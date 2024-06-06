const express = require('express')
const mongoose = require('mongoose')
const app = express()

// Conexão com o banco de dados
const pass = 'na02ru08to02'
const uri = `mongodb+srv://Nero:${pass}@colegio-cte.mcuco6p.mongodb.net/?retryWrites=true&w=majority&appName=colegio-cte`

//TODO: Conexão com o banco de dados
const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB conectado!');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Saída do processo com falha
  }
};

// Conectar ao banco de dados
connectDB();

// Middlewares
app.use(express.json())

//Rotas
const alunoRoutes = require('../routes/alunoRoutes')
const materiaRoutes = require('../routes/materiaRoutes')
const professorRoutes = require('../routes/professorRoutes')
const turmaRoutes = require('../routes/turmaRoutes')

app.use('/alunos', alunoRoutes) 
app.use('/materias', materiaRoutes)
app.use('/professores', professorRoutes)
app.use('/turmas', turmaRoutes)

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})