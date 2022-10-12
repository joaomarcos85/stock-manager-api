import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { ICreateUserServiceRequest } from '@modules/users/services/CreateUserService'
import Conflict from '@shared/infra/http/errors/Conflict'
import { z } from 'zod'
import { Validator } from '../../../shared/validations/Validator'

export class CreateUserValidator implements Validator<ICreateUserServiceRequest> {
  constructor (
    private readonly usersRepository: IUsersRepository
  ) { }

  public async execute (request: ICreateUserServiceRequest) {
    const data = z.object({
      email: z.string().email(),
      password: z.string().min(1)
    }).parse(request)

    const userExists = await this.usersRepository.findByEmail(data.email)

    if (userExists != null) {
      throw new Conflict('Email already registered')
    }

    return data
  }
}
