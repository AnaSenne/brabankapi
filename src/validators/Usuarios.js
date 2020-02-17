const {check, body} = require('express-validator')
const usuarioDao = new (require("../models/Usuarios"))()

class Usuarios{
    static validacoes(){
        return [
                check('nome').isLength({min: 5, max:100})
                .withMessage("Campo nome deve conter entre 5 e 100 caracteres!"),
                check('email').isEmail()
                .withMessage("Deve ser um email válido!"),
                check('cpf').isNumeric()
                .withMessage("Deve ser apenas números!"),
                check('sexo').isLength({min:1,max:1})
                .withMessage("Deve conter apenas um caracter(M,F ou N)!"),
                check('senha').isLength({min:6,max:15})
                .withMessage("Sua senha deve conter de 6 á 15 caracteres!"),
                body('email').custom( email => {
                    return usuarioDao.buscarPorEmail(email)
                        .then(retorno => {
                            console.log(retorno)
                            retorno = retorno[0]
                            if(retorno){
                                return Promise.reject('E-mail já cadastrado')
                            }
                        }).catch(erro => {
                            console.log(erro)
                        })
                        
                        
                })
        ]
    }
}

module.exports = Usuarios