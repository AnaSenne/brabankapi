const {check,validationResult} = require('express-validator')
const UsuariosValid = require('../validators/Usuarios')
const usuarioDAO = new (require('./models/Usuarios'))()

//tudo que está em verde é antes da refatoração 
module.exports = {
    //async = 
    async lista(req, res){
        try {
            //await = faz com que seja aguardado o retorno de usuarioDAO.lista() antes que a função prossiga
            const usuarios = await usuarioDAO.lista()

            if(!usuarios)
            return res.status(404).send({erro: 'Lista vazia'})
            res.send(usuarios)
        } catch (erro) {
            console.log(erro)
            res.status(500).send(erro)
            
        }
    },
    async insere (req, res) {
        const erros = validationResult(req)
        if(!erros.isEmpty())
        return res.status(400).send(erros)

        let usuario = req.body
        try{
            const retorno = await  usuarioDAO.insere(usuario)
            usuario = {id: retorno.insertId, ...usuario}

            res.status(201).send(usuario)
        }catch(erro){
            console.log(erro)
            res.status(500).send(erro)
        }
    }
}

const usuarios = (app) => {

    // app.get('/usuarios', (req,res) => {

    //     console.log(app);
        
      
    //     const usuarioDAO = app.models.Usuarios;

    //     usuarioDAO.lista()
    //     .then(lista => {
    //         res.send(lista)
    //     })
    //     .catch(erro => {
    //         console.log(erro)
    //         res.status(500).send(erro)
    //     })
    // })
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