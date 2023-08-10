import "dotenv/config"
import { DataSource } from 'typeorm'

const environment = process.env.NODE_ENV
export const isTestEnvironment = environment === 'test';

const normalDataSource = new DataSource({
  type: 'mongodb',
  migrationsTableName: 'migrations',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: [`${__dirname}/entities/**/*{.ts,.js}`],
  migrations: [`${__dirname}/../../migrtions/**/*{.ts,.js}`]
})

const testDataSource = new DataSource({
  type: 'sqlite',
  database: ':memory:',
  synchronize: true,
  entities: [`${__dirname}/entities/**/*{.ts,.js}`],
  migrations: [`${__dirname}/../../migrtions/**/*{.ts,.js}`]
})

export const dataSource = isTestEnvironment ? testDataSource : normalDataSource 
