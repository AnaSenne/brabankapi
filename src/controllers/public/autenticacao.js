
 //jwt  = gera um hash(token)
//string para gerar uma assinatura no token

const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../../config/auth')
const usuariosDao = new (require('../../models/Usuarios'))()

gerarToken = (params) => jwt.sign(params, auth.secret, { expiresIn: 1200 })

 module.exports = {
     async registra(req, res) {
         const erros = validationResult(req)
         if(!erros.isEmpty())
            return res.status(400).send(erros)
         let usuario = req.body
         try {
            const hash = await bcrypt.hash(usuario.senha, 10)
            usuario.senha = hash
            const resultado = await usuariosDao.insere(usuario)
            usuario = {id: resultado.insertId, ...usuario}
            res.status(201).send( {
                usuario, token : gerarToken({id: usuario.id})
            })   
         }catch(erro) {
             console.log(erro)
             res.status(500).send(erro)
         }
     },
     async autentica (req, res){
         
        const {email, senha } = req.body

        try{
            let usuario = await usuariosDao.buscarPorEmail(email)

            usuario = usuario[0]
    
            if (!usuario)
                return res.status(401)
                    .send({ erro: 'Usuário e/ou senha inválidos' })
    
            if (!await bcrypt.compare(senha, usuario.senha))
                return res.status(401)
                    .send({ erro: 'Usuário e/ou senha inválidos' })
    
    
            delete usuario.senha
            res.send({
                usuario,
                token: gerarToken({ id: usuario.id })
            })
        }catch(erro){
            console.log(erro)
        }
        
    }
}


// const autenticacao = (app) => {

//     app.post('/registrar', UsuariosValid.validacoes(), (req, res) => {
//         let usuario = req.body
//         const erros = validationResult(req)
//         const usuariosDao = app.models.Usuarios

//         if (!erros.isEmpty()) {
//             res.status(400).send(erros)
//             return
//         }

//         bcrypt.hash(usuario.senha, 10, (erro, hash) => {
//             usuario.senha = hash
//             const usuariosDao = app.models.Usuarios

//             usuariosDao.insere(usuario)
//                 .then(retorno => {
//                     delete retorno.senha
//                     res.status(201).send({ retorno, token: gerarToken({ id: retorno.id }) })
//                 })
//                 .catch(erro => {
//                     console.log(erro)
//                     res.status(500).send(erro)
//                 })

//             console.log(usuario)
//         })
//     })





//     app.post('/autenticar', async (req, res) => {
//         const {email, senha } = req.body
//         usuariosDao = app.models.Usuarios

//         const usuario = await usuariosDao.buscarPorEmail(email)
//         if (!usuario)
//             return res.status(401)
//                 .send({ erro: 'Usuário e/ou senha inválidos' })

//         if (!await bcrypt.compare(senha, usuario.senha))
//             return res.status(401)
//                 .send({ erro: 'Usuário e/ou senha inválidos' })


//         delete usuario.senha
//         res.send({
//             usuario,
//             token: gerarToken({ id: usuario.id })
//         })

//     })
// }

// module.exports = autenticacao