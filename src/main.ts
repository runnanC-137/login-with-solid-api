import 'dotenv/config'
import { app } from '@/app.domain'
import http from 'http'

async function bootstrap() {
  const port = process.env.DOMAIN_PORT ?? '3000'

  function callback(): void {
    console.log(`Server is running on port ${port}`)
  }
  app.set('port', port)

  // Create HTTP server.
  const server = http.createServer(app)

  server.listen(port, callback)
}
bootstrap()
