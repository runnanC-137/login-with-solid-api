require('dotenv/config')

const development = {
  dest: 'localStorage',
  host: 'localhost',
  port: process.env.PORT ?? '3000',
  ssl: false
}
export { development }
