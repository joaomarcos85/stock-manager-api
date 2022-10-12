import { IUser } from '../../../entities/IUser'
import { Entity, Column } from 'typeorm'
import { AbstractEntity } from '../../../../../shared/infra/typeorm/AbstractEntity'

@Entity()
export class User extends AbstractEntity implements IUser {
  id: string

  @Column()
    email: string

  @Column()
    password: string
}
