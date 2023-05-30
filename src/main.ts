import 'dotenv/config'
import { app } from '@/app'
import http from 'http'

const port = process.env.DOMAIN_PORT ?? '3000'

app.set('port', port)

// Create HTTP server.
const server = http.createServer(app)

server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
