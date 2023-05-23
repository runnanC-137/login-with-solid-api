import 'dotenv/config'
import { app } from './domain/app'
// var debug = require('debug')('example-api-mongoose:server');
import http from 'http'

const port: string = process.env.DOMAIN_PORT ?? '3000'

app.set('port', port)

// Create HTTP server.

const server = http.createServer(app)

server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
