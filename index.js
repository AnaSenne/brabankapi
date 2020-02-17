
const app = require('./src/server')

// const usuarioController = require('./controllers/usuarios')

// usuarioController(app)



// app.get('/', (req,res) => {
//     res.send('Root Rote Node')
// })

// app.get('/usuarios', (req,res) => {
//     const usuario = {nome:'Ana Senne', senha:'1234'}
//     res.send(usuario)
// })


app.listen(3000, () =>{
    console.log('Servidor rodando na porta 3000')
})  