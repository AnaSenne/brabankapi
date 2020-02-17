const express = require('express')
const app = express()
const auth = require('./routers/authRoutes')
const categoria = require('./routers/categoriasRoutes')
const authMid = require('./middlewares/auth')

app.use(express.json())


app.use('/', auth)

app.use(authMid)


app.use('/categorias', categoria)

module.exports = app