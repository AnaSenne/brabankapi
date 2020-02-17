//const conexao = require('../config/conexao-db')
const baseQuery = require('./baseQuery')

//tudo que está em verde foi antes fatoração

class Categorias {

    lista() {
        return baseQuery('SELECT * FROM categoria')
        // return new Promise((resolve, reject) => {
        //     const sql = 'SELECT * FROM usuario'
        //     conexao.query(sql, (erro, retorno) => {
        //         if (erro) {
        //             reject('Erro ao consultar:' + erro)
        //         } else {
        //             console.log('Consultado com sucesso!!')
        //             resolve(retorno)
        //         }
        //     })
        // })
    }
    insere(categoria) {
        return baseQuery('INSERT INTO categoria set ?', categoria)
        // return new Promise((resolve, reject) => {
        //     const sql = 'INSERT INTO usuario set ?'
        //     conexao.query(sql, usuario, (erro, retorno) => {
        //         //1°opção: erro ? reject("Erro ao inserir:" + erro) : resolve(retorno)
        //         //2°opção: if(erro){
        //         //    reject("Erro ao inserir: "  + erro)
        //         //  return
        //         //})
        //         //resolve(retorno)
        //         if (erro) {
        //             reject("Erro ao inserir: " + erro)
        //         } else {
        //             resolve({ id: retorno.insertId, ...usuario })
        //         }
        //     })
        // })
    }
    buscarPorId(id) {
        return baseQuery("SELECT * FROM categoria WHERE id = ?", id)
    }
        // return new Promise((resolve, reject) => {

        //     const sql = "SELECT * FROM usuario WHERE email = ?"
        //     conexao.query(sql, email, (erro, retorno) => {
        //         if (erro) {
        //             reject("Erro ao consultar:" + erro)
        //         } else {
        //             const usuario = retorno[0];

        //             resolve(usuario)
        //         }
        //     })

        // })

        atualiza(categoria){
            return baseQuery('UPDATE categoria SET ? WHERE id = ?', [categoria,categoria.id])
        }
        delete(id){
            return baseQuery('DELETE FROM categoria WHERE id = ?', id)
        }


}
module.exports =  Categorias;