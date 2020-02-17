const express = require('express')
const app = express()
const consign = require('consign')

//configura toda a aplicação
customExpress = () => {
    //recebendo e enviado jsons
    app.use(express.json())


    consign()
        .include('controllers/public')
        .then('middlewares')
        .then('controllers')
        .then('models')
        .into(app)

    return app
}
module.exports = customExpress()