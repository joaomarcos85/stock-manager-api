import 'reflect-metadata'
import '@shared/container'
import 'express-async-errors'
import { createServer, Server } from 'http'
import express, { Application, json } from 'express'
import cors from 'cors'
import { ErrorHandlerMidleware } from './routes/middlewares/ErrorHandlerMidleware'
import routes from './routes/router'
import { initializeDatabaseConnection } from '../../../config/database'

export class App {
  public server: Server
  private readonly app: Application

  constructor () {
    initializeDatabaseConnection()
    this.app = express()
    this.server = createServer(this.app)
    this.middlewares()
    this.routes()
    this.errors()
  }

  middlewares () {
    this.app.use(json())
    this.app.use(cors())
  }

  routes () {
    this.app.use('/api/v1', routes)
  }

  errors () {
    this.app.use(ErrorHandlerMidleware)
  }
}
