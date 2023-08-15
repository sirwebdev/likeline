import "dotenv/config"
import { Server } from "./server"
import { PORT } from "@infrastructures/constants/server"

const server = new Server()

server.init(PORT)
