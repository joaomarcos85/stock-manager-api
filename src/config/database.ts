import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'stock_manager',
  logging: false,
  synchronize: true,
  entities: ['src/modules/**/*/infra/typeorm/entities/*.ts']
})

export const teste = Date.now()

export function initializeDatabaseConnection () {
  AppDataSource
    .initialize()
    .then(() => console.log('🚀 Database connected!'))
    .catch((err) => {
      console.error('❌ Error connecting to database', err)
    })
}
