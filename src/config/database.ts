import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_POSTGRES_HOST,
  port: Number(process.env.DB_POSTGRES_PORT ?? 5432),
  username: process.env.DB_POSTGRES_USER,
  password: process.env.DB_POSTGRES_PASSWORD,
  database: process.env.DB_POSTGRES_NAME,
  logging: false,
  synchronize: true,
  entities: [
    process.env.TYPEORM_ENTITIES ?? ''
  ]
})

export function initializeDatabaseConnection () {
  AppDataSource
    .initialize()
    .then(() => console.log('🚀 Database connected!'))
    .catch((err) => {
      console.error('❌ Error connecting to database', err)
    })
}
