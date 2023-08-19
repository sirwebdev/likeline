import { MongoMemoryServer } from "mongodb-memory-server"

export = async function globalSetup() {
  const instance = await MongoMemoryServer.create()
  const uri = instance.getUri()

  process.env.MONGO_URI = uri.slice(0, uri.lastIndexOf('/'));
  global.__MONGO_INSTANCE = instance
}
