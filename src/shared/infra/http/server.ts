import 'dotenv-safe/config'
import { App } from './app'

const app = new App()

const PORT = process.env.PORT ?? 3000
app.server.listen(PORT, () => {
  console.log(`🔥 Server started on port ${PORT}!`)
})
