import supertest from 'supertest'

import { Server } from "@api/server"
import { dataSource } from '@infrastructures/typeorm/datasource'

// Handle multiple database connection and prevent memory leak
afterAll(async () => {
  await dataSource.mongo.destroy()
  await dataSource.postgres.destroy()
})

class GetServer extends Server {
  async getAPI() {
    await this.setup()

    return this.api
  }
}


export async function getApiForTest() {
  const server = await new GetServer().getAPI()


  return supertest(server)
}
