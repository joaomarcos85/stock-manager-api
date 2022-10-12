import { container } from 'tsyringe'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import IHashProvider from '@modules/users/providers/hashProvider/models/IHashProvider'
import BCryptHashProvider from '@modules/users/providers/hashProvider/BCryptHashProvider'
import { UsersRepository } from '@modules/users/infra/inMemory/repositories/UsersRepository'

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository)
container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider)
