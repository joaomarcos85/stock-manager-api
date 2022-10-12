import { Request, Response } from 'express'
import CreateUserService from '@modules/users/services/CreateUserService'
import { container } from 'tsyringe'

export class UsersController {
  public async create (request: Request, response: Response): Promise<Response> {
    const {
      email,
      password
    } = request.body

    const createUserService = container.resolve(CreateUserService)
    const createdUser = await createUserService.execute({
      email,
      password
    })

    return response.json(createdUser)
  }
}
