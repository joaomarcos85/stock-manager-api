import { Router } from 'express'
import { AuthenticationController } from '../controllers/AuthenticationController'

const routes = Router()
const controller = new AuthenticationController()

routes.post('/login', controller.authenticate)

export default routes
