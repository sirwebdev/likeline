import "dotenv/config"

import { DataSource } from 'typeorm'

export const dataSource = new DataSource({
  type: 'mongodb',
  migrationsTableName: 'migrations',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: [`${__dirname}/entities/**/*{.ts,.js}`],
  migrations: [`${__dirname}/../../migrtions/**/*{.ts,.js}`]
})
