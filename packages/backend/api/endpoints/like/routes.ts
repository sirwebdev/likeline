import { Router } from "express";
import { container } from "tsyringe";

import { LikePostController } from "./controllers/like-post";

export const likeRoutes = Router()

const likePostController = container.resolve(LikePostController)

likeRoutes.post('/:post_id', likePostController.execute)
