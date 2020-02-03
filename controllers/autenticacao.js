const {check,validationResult} = require('express-validator')
const UsuariosValid = require('../validators/Usuarios') 


const autenticacao = (app) => {

    app.post('/registrar', UsuariosValid.validacoes(),(req,res) => {
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


    app.post('/autenticar', (req, res) => {

    })
}

module.exports = autenticacao