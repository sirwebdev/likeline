import "dotenv/config"
import { DataSource } from 'typeorm'

import { isTestEnvironment } from "@infrastructures/constants/server"

const POSTGRES_ENTITES_PATHING = `${__dirname}/entities/postgres/**/*{.ts,.js}`
const POSTGRES_MIGRATIONS_PATHING = `${__dirname}/migrations/postgres/**/*{.ts,.js}`

const MONGO_ENTITES_PATHING = `${__dirname}/entities/mongo/**/*{.ts,.js}`
const MONGO_MIGRATIONS_PATHING = `${__dirname}/migrations/mongo/**/*{.ts,.js}`

const postgresDataSource = new DataSource({
  name: 'postgres',
  type: 'postgres',
  migrationsRun: true,
  host: process.env.PG_DB_HOST,
  database: process.env.PG_DB_NAME,
  migrationsTableName: 'migrations',
  entities: [POSTGRES_ENTITES_PATHING],
  port: Number(process.env.PG_DB_PORT),
  username: process.env.PG_DB_USERNAME,
  password: process.env.PG_DB_PASSWORD,
  migrations: [POSTGRES_MIGRATIONS_PATHING]
})

const mongoDatasource = new DataSource({
  name: 'mongodb',
  type: 'mongodb',
  useNewUrlParser: true,
  useUnifiedTopology: true,
  entities: [MONGO_ENTITES_PATHING],
  migrations: [MONGO_MIGRATIONS_PATHING],
  url: `mongodb://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_HOST}:${process.env.MONGO_DB_PORT}/${process.env.MONGO_DB_NAME}?authSource=admin`,
})


const testPostgresDataSource = new DataSource({
  type: 'sqlite',
  synchronize: true,
  database: ':memory:',
  entities: [POSTGRES_ENTITES_PATHING],
  migrations: [POSTGRES_MIGRATIONS_PATHING]
})

const testmongoDatasource = new DataSource({
  name: 'mongodb',
  type: 'mongodb',
  useNewUrlParser: true,
  useUnifiedTopology: true,
  url: `${process.env.MONGO_URI}/${process.env.MONGO_DB_NAME}`,
  entities: [MONGO_ENTITES_PATHING],
  migrations: [MONGO_MIGRATIONS_PATHING],
})


export const dataSource = isTestEnvironment ? {
  mongo: testmongoDatasource,
  postgres: testPostgresDataSource,
} : {
  mongo: mongoDatasource,
  postgres: postgresDataSource,
}

export default postgresDataSource
