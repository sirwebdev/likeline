import { Router } from "express";
import { container } from "tsyringe";

import { LikePostController } from "./controllers/like-post";
import { UnLikePostController } from "./controllers/unlike-post";

export const likeRoutes = Router()

const likePostController = container.resolve(LikePostController)
const unLikePostController = container.resolve(UnLikePostController)

likeRoutes.post('/:post_id', likePostController.execute)
likeRoutes.delete('/:like_id', unLikePostController.execute)
