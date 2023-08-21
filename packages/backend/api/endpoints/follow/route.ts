import { Router } from "express";
import { container } from "tsyringe";

import { FollowController } from "./controllers/follow";
import { UnFollowController } from "./controllers/unfollow";
import { injectImageLink } from "./middlewares/inject-image-link";

export const followRoutes = Router()

const followController = container.resolve(FollowController)
const unFollowController = container.resolve(UnFollowController)

followRoutes.delete('', unFollowController.execute)
followRoutes.post('', followController.execute, injectImageLink)
