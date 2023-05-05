/* const jwt = require('jsonwebtoken')
const { User } = require('../database/models')
const { secret } = require('../config/auth')

module.exports = (req, res, next) => {
  const token = req.header('authorization').split(' ')[1]
  if (!token) res.status(401).json({ error: { message: 'Token inexistente', code: '002000' } })
  else {
    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        console.log(err)
        res.status(401).json({ error: { message: 'Token invalido', code: '002001', err } })
      } else {
        User.findByPk(decoded.id)
          .then(user => {
            req.user = user
            next()
          })
          .catch(err => {
            console.log(err)
            res.status(401).json({ error: { message: 'Usuário inexistente', code: '002002', err } })
          })
      }
    })
  }
}
 */
