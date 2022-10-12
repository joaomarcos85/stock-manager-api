import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

export abstract class AbstractEntity {
  @PrimaryColumn({ length: 36 })
    id: string

  @CreateDateColumn()
    createdDate: Date

  @UpdateDateColumn({ nullable: true })
    modifiedDate?: Date

  @Column({ default: true })
    active: boolean

  @BeforeInsert()
  generateUuid (): void {
    this.id = uuidv4()
  }
}
