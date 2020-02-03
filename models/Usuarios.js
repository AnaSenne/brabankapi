const conexao = require('../config/conexao-db')


class Usuarios {

    lista(){
        return new Promise((resolve,reject) => {
            const sql = 'SELECT * FROM usuario'
            conexao.query(sql,(erro,retorno) => {
                if(erro){
                    reject('Erro ao consultar:' + erro)
                }else{
                    console.log('Consultado com sucesso!!')
                    resolve(retorno)
                } 
            })
        })
    }
    insere (usuario){
        return new Promise((resolve,reject) => {
            const sql = 'INSERT INTO usuario set ?'
            conexao.query(sql,usuario,(erro, retorno) =>{
                //1°opção: erro ? reject("Erro ao inserir:" + erro) : resolve(retorno)
                //2°opção: if(erro){
                //    reject("Erro ao inserir: "  + erro)
                //  return
                //})
                //resolve(retorno)
                if(erro){
                    reject("Erro ao inserir: "  + erro)
                }else{
                  resolve({id:retorno.insertId, ...usuario})
                }
            })
        })
    }
    buscarPorEmail(email){
        return new Promise((resolve,reject) =>{
          
            const sql = "SELECT * FROM usuario WHERE email = ?"
            conexao.query(sql,email,(erro,retorno) =>{
                if(erro){
                    reject("Erro ao consultar:" + erro)
                }else{
                    const usuario = retorno[0]
                if(usuario) {
                    resolve(usuario)
                }else{
                    reject("Usuário não encontrado!")
                }               
             }
            })

        })
      

        
    }
}
module.exports =  new Usuarios();