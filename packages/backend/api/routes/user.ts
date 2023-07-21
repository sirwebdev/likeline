import { Router } from "express";
import { CreateUserController } from "../endpoints/user/controllers/create";
import { container } from "tsyringe";

export const userRouter = Router();

const createUserController = container.resolve(CreateUserController)

userRouter.post('', createUserController.execute)
