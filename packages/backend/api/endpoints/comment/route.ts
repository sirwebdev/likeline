import { Router } from "express";
import { container } from "tsyringe";

import { CommentPostController } from "./controllers/post";

export const commentRoutes = Router()

const commentPostController = container.resolve(CommentPostController)

commentRoutes.post('', commentPostController.execute)
