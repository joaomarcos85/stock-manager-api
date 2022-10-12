import BadRequest from '@shared/infra/http/errors/BadRequest'
import Unauthorized from '@shared/infra/http/errors/Unauthorized'
import { Service } from '@shared/services/Service'
import IHashProvider from '@modules/users/providers/hashProvider/models/IHashProvider'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { AuthenticateUserValidator } from '@modules/users/validations/AuthenticateUserValidator'
import { TokenService } from '@modules/users/services/TokenService'
import { inject, injectable } from 'tsyringe'

export interface IAuthenticateUserServiceRequest {
  email: string
  password: string
}

export interface IAuthenticateUserServiceResponse {
  email: string
  token: string
}

@injectable()
export class AuthenticateUserService implements Service<IAuthenticateUserServiceRequest, IAuthenticateUserServiceResponse> {
  constructor (
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
    @inject('HashProvider')
    private readonly hashProvider: IHashProvider
  ) { }

  public async execute (request: IAuthenticateUserServiceRequest): Promise<IAuthenticateUserServiceResponse> {
    const { email, password } = await new AuthenticateUserValidator().execute(request)

    const login = await this.usersRepository.findByEmail(email)

    if (login == null) {
      throw new BadRequest('Invalid e-mail')
    }

    const isValidPass: boolean = await this.hashProvider.compareHash(password, login.password)

    if (!isValidPass) {
      throw new Unauthorized('Invalid password!')
    }

    const token = new TokenService().generateToken({
      email
    })

    return {
      email,
      token
    }
  }
}
