import "dotenv/config"
import 'reflect-metadata'

import express, { Express } from 'express'

import './infraestructures/containers'

import { apiRoutes } from "./routes"
import { dataSource } from "./infraestructures/typeorm/datasource"

const GLOBAL_PREFIX = '/api'

export class Server {
  private api: Express = express()

  constructor() {
    this.setup().then(() => {
    })
  }

  private async connectIntoDB() {
    await dataSource.initialize().then(() =>
      console.log('Connected to database successfuly !')
    ).catch((error) =>
      console.error('Failed to connect into database', error)
    )
  }

  private async setup() {
    await this.connectIntoDB()

    this.api.use(express.json())

    this.useRoutes()
  }

  private useRoutes() {
    this.api.use(GLOBAL_PREFIX, apiRoutes)
  }

  public init(port: number) {
    this.api.listen(port, () => {
      console.log(`Server listening on port: ${port}.`, ` Try http://localhost:${port}`)
    })
  }
}
