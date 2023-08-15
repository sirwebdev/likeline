import "dotenv/config"
import { DataSource } from 'typeorm'

const environment = process.env.NODE_ENV
export const isTestEnvironment = environment === 'test';

const normalDataSource = new DataSource({
  type: 'postgres',
  migrationsRun: true,
  host: process.env.PG_DB_HOST,
  database: process.env.PG_DB_NAME,
  migrationsTableName: 'migrations',
  port: Number(process.env.PG_DB_PORT),
  username: process.env.PG_DB_USERNAME,
  password: process.env.PG_DB_PASSWORD,
  entities: [`${__dirname}/entities/**/*{.ts,.js}`],
  migrations: [`${__dirname}/migrations/**/*{.ts,.js}`]
})

const testDataSource = new DataSource({
  type: 'sqlite',
  synchronize: true,
  database: ':memory:',
  entities: [`${__dirname}/entities/**/*{.ts,.js}`],
  migrations: [`${__dirname}/migrations/**/*{.ts,.js}`]
})

export const dataSource = isTestEnvironment ? testDataSource : normalDataSource 
