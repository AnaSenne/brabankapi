const express = require('express')
const app = express()
const consign = require('consign')

customExpress = () => {
    app.use(express.json())

    consign()
    .include('controllers')
    .include('models')
    .into(app)
    

    return app
}
module.exports = customExpress()