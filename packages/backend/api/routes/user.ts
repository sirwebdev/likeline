import { Router } from "express";
import { container } from "tsyringe";

import { CreateUserController } from "../endpoints/user/controllers/create";
import { ProfileController } from "@api/endpoints/user/controllers/profile";
import { authenticateRequest } from "@infrastructures/middlewares/authenticate-request";

export const userRouter = Router();

const createUserController = container.resolve(CreateUserController)
const profileController = container.resolve(ProfileController)

userRouter.post('', createUserController.execute)

userRouter.use(authenticateRequest)
userRouter.get('/profile', profileController.execute)
