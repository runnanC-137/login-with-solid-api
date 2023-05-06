require('dotenv/config')
const development = {
  username: process.env.DB_USERNAME ?? 'username',
  password: process.env.DB_PASSWORD ?? 'password',
  database: process.env.DB_DATABASE ?? 'database',
  host: process.env.DB_HOST ?? 'localhost',
  dialect: process.env.DB_DIALECT ?? 'postgres'
}

const test = {
  username: process.env.DB_USERNAME ?? 'username',
  password: process.env.DB_PASSWORD ?? 'password',
  database: process.env.DB_DATABASE ?? 'database',
  host: process.env.DB_HOST ?? 'localhost',
  dialect: process.env.DB_DIALECT ?? 'postgres'
}
const production = {
  username: 'username',
  password: 'password',
  database: 'database',
  host: 'host',
  dialect: 'mysql'
}
const config = { development, test, production }

export { config }
