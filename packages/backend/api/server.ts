import "dotenv/config"
import 'reflect-metadata'
import 'express-async-errors'

import express, { Express } from 'express'

import '@infrastructures/containers'

import { apiRoutes } from "./routes"
import { dataSource } from "@infrastructures/typeorm/datasource"
import { CentralizedErrorHandler } from "@infrastructures/error-handling/centralized-error-handler"

export const GLOBAL_PREFIX = '/api'

export class Server {
  protected api: Express = express()

  protected async setup() {
    await this.connectIntoDB()

    this.useMiddlewares()
    this.useRoutes()

    this.api.use(CentralizedErrorHandler)
  }

  protected async connectIntoDB() {
    await dataSource.initialize().then(() =>
      console.log('Connected to database successfuly !')
    ).catch((error) =>
      console.error('Failed to connect into database', error)
    )
  }

  protected useMiddlewares() {
    this.api.use(express.json())
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
