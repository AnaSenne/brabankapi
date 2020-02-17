const mysql = require('mysql')

const conexao = mysql.createConnection
({
    host:'54.157.44.23',
    port:3306,
    user:'profrafa',
    password:'bcd127',
    database:'brabank'
})

module.exports = conexao