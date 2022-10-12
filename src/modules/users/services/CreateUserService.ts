import { CreateUserValidator } from '@modules/users/validations/CreateUserValidator'
import { inject, injectable } from 'tsyringe'
import { Service } from '../../../shared/services/Service'
import { IUser } from '../entities/IUser'
import IHashProvider from '../providers/hashProvider/models/IHashProvider'
import { IUsersRepository } from '../repositories/IUsersRepository'

export interface ICreateUserServiceRequest {
  email: string
  password: string
}

export type ICreateUserServiceResponse = Omit<IUser, 'password'>

@injectable()
class CreateUserService implements Service<ICreateUserServiceRequest, ICreateUserServiceResponse> {
  constructor (
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
    @inject('HashProvider')
    private readonly hashProvider: IHashProvider
  ) { }

  public async execute (request: ICreateUserServiceRequest): Promise<ICreateUserServiceResponse> {
    const { email, password } = await new CreateUserValidator(this.usersRepository).execute(request)
    const hashedPassword = await this.hashProvider.generateHash(password)

    const user = await this.usersRepository.create({
      email,
      password: hashedPassword
    })

    return {
      id: user.id,
      email: user.email
    }
  }
}

export default CreateUserService
