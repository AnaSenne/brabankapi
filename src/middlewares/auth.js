const jwt = require('jsonwebtoken')
const auth = require('../config/auth')


// module.exports = (app) => {
//     app.use(mid)
// }

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization
    //verifica  se tem authorization no header
    if (!authHeader) {
        return res.status(401).send({ erro: 'Token não informado' })
    }
    const parts = authHeader.split(' ')

    //verifica se o authorization tem duas partes
    if (parts.length !== 2)
        return res.status(401).send({ erro: 'Erro no Token' })

    const [bearer, token] = parts
    //verifica e a primeira parte contém o Bearer
    if (!/^Bearer$/i.test(bearer))
        return res.status(401).send({ erro: 'Token mal formatado' })
    //verifica se o Token é válido
    try {
        const decoded = await jwt.verify(token, auth.secret)
        req.userId = decoded.id
        return next()
    } catch (error) {
        return res.status(401).send({ erro: 'Token inválido' })
    }

}
