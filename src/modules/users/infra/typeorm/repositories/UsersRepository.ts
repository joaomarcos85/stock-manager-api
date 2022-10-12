
import { AppDataSource } from '@config/database'
import { IUser, IUserCreate } from '@modules/users/entities/IUser'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { User } from '@modules/users/infra/typeorm/entities/User'

export class UsersRepository implements IUsersRepository {
  ormRepository = AppDataSource.getRepository(User)

  async create (data: IUserCreate): Promise<IUser> {
    const user = this.ormRepository.create(data)

    await this.ormRepository.save(user)

    return user
  }

  async findByEmail (email: string): Promise<IUser | null> {
    const user = this.ormRepository.findOne({
      where: {
        email
      }
    })
    return await user
  }
}
