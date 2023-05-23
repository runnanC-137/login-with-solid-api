require('dotenv/config')

module.exports = {
  secret: process.env.TOKEN_SECRET ?? 'nsCPYmBVRM',
  refreshTokenSecret: process.env.TOKEN_REFRESH ?? 'TPhiqNVdao',
  expiresIn: process.env.TOKEN_EXPIREIN ?? 25200,
  expireInRefreshToken: process.env.TOKEN_EXPIRE_REFRESH ?? 86400,
}
