import "dotenv/config"

import express, { Express } from 'express'
import { apiRoutes } from "./routes"

const GLOBAL_PREFIX = '/api'

export class Server {
  private api: Express = express()

  constructor() {
    this.setup()
    this.useRoutes()
  }

  private setup() {
    this.api.use(express.json())
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
