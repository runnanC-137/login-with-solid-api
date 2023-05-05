const jwt = require('jsonwebtoken')
const { secret, expiresIn } = require('../config/auth')

const jwtGenerate = (userId) => jwt.sign(
  { id: userId },
  secret,
  { expiresIn }
)

module.exports = { jwtGenerate }
