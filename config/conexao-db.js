const mysql = require('mysql')

const conexao = mysql.createConnection
({
    host:'3.83.134.19',
    port:3306,
    user:'ana',
    password:'bcd127',
    database:'brabank'
})
module.exports = conexao