import { Router } from "express"
import { container } from 'tsyringe'

import { AuthController } from '../endpoints/auth/controllers/authentication'

export const authRouter = Router()

const authenticationController = container.resolve(AuthController)

authRouter.post('/', authenticationController.execute)
