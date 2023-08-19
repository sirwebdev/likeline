import { Router } from "express";
import { container } from "tsyringe";
import { CreateFollowController } from "./controllers/create";

export const followRoutes = Router()

const createFollowController = container.resolve(CreateFollowController)

followRoutes.post('', createFollowController.execute)
