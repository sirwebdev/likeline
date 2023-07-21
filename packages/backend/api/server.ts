import "dotenv/config"

import express, { Express } from 'express'

export class Server {
  private api: Express = express()

  public init(port: number) {
    this.api.listen(port, () => {
      console.log(`Server listening on port: ${port}.`, ` Try http://localhost:${port}`)
    })
  }
}
