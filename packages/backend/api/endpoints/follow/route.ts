import { Router } from "express";
import { container } from "tsyringe";

import { CreateFollowController } from "./controllers/create";
import { UnFollowController } from "./controllers/unfollow";

export const followRoutes = Router()

const unFollowController = container.resolve(UnFollowController)
const createFollowController = container.resolve(CreateFollowController)

followRoutes.delete('', unFollowController.execute)
followRoutes.post('', createFollowController.execute)
