import { IUser, IUserCreate } from '@modules/users/entities/IUser'

export interface IUsersRepository {
  create: (data: IUserCreate) => Promise<IUser>
  findByEmail: (email: string) => Promise<IUser | null>
}
