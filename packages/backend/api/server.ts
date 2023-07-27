import "dotenv/config"
import 'reflect-metadata'

import express, { Express } from 'express'

import '@infraestructures/containers'

import { apiRoutes } from "./routes"
import { dataSource } from "@infraestructures/typeorm/datasource"

export const GLOBAL_PREFIX = '/api'

export class Server {
  protected api: Express = express()

  protected async setup() {
    await this.connectIntoDB()

    this.api.use(express.json())

    this.useRoutes()
  }

  protected async connectIntoDB() {
    await dataSource.initialize().then(() =>
      console.log('Connected to database successfuly !')
    ).catch((error) =>
      console.error('Failed to connect into database', error)
    )
  }


  private useRoutes() {
    this.api.use(GLOBAL_PREFIX, apiRoutes)
  }

  public async init(port: number) {
    await this.setup()

    this.api.listen(port, () => {
      console.log(`Server listening on port: ${port}.`, ` Try http://localhost:${port}`)
    })
  }
}
