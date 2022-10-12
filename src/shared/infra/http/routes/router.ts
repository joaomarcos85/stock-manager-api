import { Router } from 'express'
import LoginRoutes from '@modules/users/infra/http/routes/login.routes'
import UserRoutes from '@modules/users/infra/http/routes/user.routes'

const routes = Router()

routes.use(LoginRoutes)
routes.use(UserRoutes)

export default routes
