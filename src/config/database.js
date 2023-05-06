require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.testing' : '.env'
})

module.exports = {
  development: {
    username: process.env.DB_USERNAME ?? 'username',
    password: process.env.DB_PASSWORD ?? 'password',
    database: process.env.DB_DATABASE ?? 'database',
    host: process.env.DB_HOST ?? 'localhost',
    dialect: process.env.DB_DIALECT ?? 'Postgres'
  },

  test: {
    username: process.env.DB_USERNAME ?? 'username',
    password: process.env.DB_PASSWORD ?? 'password',
    database: process.env.DB_DATABASE ?? 'database',
    host: process.env.DB_HOST ?? 'localhost',
    dialect: process.env.DB_DIALECT ?? 'Postgres'
  },

  production: {
    username: 'username',
    password: 'password',
    database: 'database',
    host: 'host',
    dialect: 'mysql'
  }
}
