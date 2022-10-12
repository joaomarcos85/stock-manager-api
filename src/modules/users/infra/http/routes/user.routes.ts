import { UsersController } from '@modules/users/infra/http/controllers/UsersController'
import { Router } from 'express'

const routes = Router()
const controller = new UsersController()

routes.post('/', controller.create)

export default routes
