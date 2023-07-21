import { Router } from "express";
import { CreateUserController } from "../endpoints/user/controllers/create";

export const userRouter = Router();

userRouter.post('', CreateUserController.execute)
