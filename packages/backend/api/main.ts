import "dotenv/config"
import { Server } from "./server"

const PORT = Number(process.env.PORT) || 3333;

const server = new Server()

server.init(PORT)
