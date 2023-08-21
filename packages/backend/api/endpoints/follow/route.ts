import { Router } from "express";
import { container } from "tsyringe";

import { FollowController } from "./controllers/follow";
import { UnFollowController } from "./controllers/unfollow";

export const followRoutes = Router()

const followController = container.resolve(FollowController)
const unFollowController = container.resolve(UnFollowController)

followRoutes.post('', followController.execute)
followRoutes.delete('', unFollowController.execute)
