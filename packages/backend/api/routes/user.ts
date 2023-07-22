import { Router } from "express";
import { container } from "tsyringe";

import { CreateUserController } from "../endpoints/user/controllers/create";
export const userRouter = Router();

const createUserController = container.resolve(CreateUserController)

userRouter.post('', createUserController.execute)
