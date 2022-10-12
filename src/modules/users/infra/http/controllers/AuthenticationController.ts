import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { AuthenticateUserService } from '../../../services/AuthenticateUserService'

export class AuthenticationController {
  public async authenticate (request: Request, response: Response) {
    const { email, password } = request.body

    const authenticateUser = container.resolve(AuthenticateUserService)
    const autheticatedUser = await authenticateUser.execute({
      email,
      password
    })

    return response.json(autheticatedUser)
  }
}
