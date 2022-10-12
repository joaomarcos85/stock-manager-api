import { IUserCreate, IUser } from '@modules/users/entities/IUser'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { v4 as uuidv4 } from 'uuid'

export class UsersRepository implements IUsersRepository {
  private readonly data: IUser[] = []

  async create (data: IUserCreate): Promise<IUser> {
    const user: IUser = {
      id: uuidv4(),
      ...data
    }
    this.data.push(user)
    return user
  }

  async findByEmail (email: string): Promise<IUser | null> {
    const user = this.data.find(user => user.email === email)
    return user ?? null
  }
}
