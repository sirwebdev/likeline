import { Router } from "express";
import { container } from "tsyringe";

import { CreateUserController } from "../endpoints/user/controllers/create";
import { ProfileController } from "@api/endpoints/user/controllers/profile";
import { authenticateRequest } from "@infrastructures/middlewares/authenticate-request";
import { DeleteUserController } from "@api/endpoints/user/controllers/delete";

export const userRouter = Router();

const profileController = container.resolve(ProfileController)
const createUserController = container.resolve(CreateUserController)
const deleteUserController = container.resolve(DeleteUserController)

userRouter.post('', createUserController.execute)

userRouter.use(authenticateRequest)
userRouter.delete('', deleteUserController.execute)
userRouter.get('/profile', profileController.execute)
