import dotenv from 'dotenv-safe'
import { App } from './app'

dotenv.config()

const app = new App()

const PORT = process.env.PORT ?? 3000
app.server.listen(PORT, () => {
  console.log(`🔥 Server started on port ${PORT}!`)
})
