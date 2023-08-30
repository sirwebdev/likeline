import "dotenv/config"
import 'reflect-metadata'
import 'express-async-errors'

import express, { Express } from 'express'

import '@infrastructures/containers'

import { apiRoutes } from "./routes"
import { dataSource } from "@infrastructures/typeorm/datasource"
import { CentralizedErrorHandler } from "@infrastructures/error-handling/centralized-error-handler"
import { GLOBAL_PREFIX, STATIC_IMAGES_PATH, UPLOADS_FOLDER, isTestEnvironment } from "@infrastructures/constants/server"


export class Server {
  protected api: Express = express()

  protected async setup() {
    await this.connectIntoDB()

    this.useMiddlewares()
    this.useRoutes()

    this.api.use(CentralizedErrorHandler)
  }

  protected async connectIntoDB() {
    try {
      await dataSource.mongo.initialize()
      await dataSource.postgres.initialize()

      if (!isTestEnvironment) console.info('Connected into all DBs')
    } catch (error) {
      console.error('Failed to connect into DB: ', error)
    }
  }

  protected useMiddlewares() {
    this.api.use(express.json())
    this.api.use(STATIC_IMAGES_PATH, express.static(UPLOADS_FOLDER))
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
