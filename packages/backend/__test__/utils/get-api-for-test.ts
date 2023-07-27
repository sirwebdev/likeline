import supertest from 'supertest'

import { Server } from "@api/server"

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
