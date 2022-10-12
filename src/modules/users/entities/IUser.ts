export interface IUser {
  id: string
  email: string
  password: string
}

export type IUserCreate = Omit<IUser, 'id'>
