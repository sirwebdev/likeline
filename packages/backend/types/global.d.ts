import type { MongoMemoryServer } from "mongodb-memory-server"

declare global {
  var __MONGO_INSTANCE: MongoMemoryServer
}

export { }
