const {check,validationResult} = require('express-validator')
const UsuariosValid = require('../validators/Usuarios')

const usuarios = (app) => {

  


    app.get('/', (req,res) => {
    res.send('Root Rote Node')
    })

    app.get('/usuarios', (req,res) => {

        console.log(app);
        
      
        const usuarioDAO = app.models.Usuarios;

        usuarioDAO.lista()
        .then(lista => {
            res.send(lista)
        })
        .catch(erro => {
            console.log(erro)
            res.status(500).send(erro)
        })
    })
    app.post('/usuarios',UsuariosValid.validacoes(),(req,res) => {
        let usuario = req.body
        const erros =  validationResult(req)
        const usuariosDao = app.models.Usuarios

        if(!erros.isEmpty()){
            res.status(400).send(erros)
            return
        }

        usuariosDao.insere(usuario)
        .then(retorno => {
            //usuario.id = retorno.insertId;
           // res.status(201).send(usuario)
           res.status(201).send(retorno)
        })
        .catch(erro =>{
            console.log(erro)
            res.status(500).send(erro)
        })

        console.log(usuario)
    })

    app.get('/usuarios/email/:email',(req,res) =>{
        const email = req.params.email

        usuarioDAO = app.models.Usuarios
        usuarioDAO.buscarPorEmail(email)
        .then(retorno => {
            if(retorno){
                
                res.status(201).send(retorno)
            }else{
                res.status(404).send()
            }
            res.send(retorno)           
        })
        .catch(erro => res.status(500).send(erro))

    })
}
module.exports = usuarios