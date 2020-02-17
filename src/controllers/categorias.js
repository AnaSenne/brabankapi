
const categoriaDAO = new (require('../models/Categorias'))
const { validationResult } = require('express-validator')




module.exports = {

    async lista(req,res) {
        try {
            const categorias = await categoriaDAO.lista()
            console.log(categorias)
            if (categorias.length == 0)
                return res.status(404).send({ erro: 'Lista vazia' })

            res.send(categorias)
        } catch (erro) {
            console.log(erro)
            res.status(500).send(erro)
        }
    },
    async insere(req, res) {

        const erros = validationResult(req)

        if (!erros.isEmpty())
            return res.status(400).send(erros)
        let categoria = req.body
        try {
            const resultado = await categoriaDAO.insere(categoria)
            categoria = { id: resultado.insertId, ...categoria }
            res.status(201).send(categoria)
        } catch (error) {
            console.log(erro)
            res.status(500).send(erro)

        }

    }
}
//     module.exports = (app) => {
//         app.get('/categorias', (req,res) => {
//             res.send('Veioo')
//     })
// }