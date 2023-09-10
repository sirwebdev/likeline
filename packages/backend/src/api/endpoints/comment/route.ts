import { Router } from "express";
import { container } from "tsyringe";

import { CommentPostController } from "./controllers/post";
import { ReplyCommentController } from "./controllers/reply";

export const commentRoutes = Router()

const commentPostController = container.resolve(CommentPostController)
const replyCommentController = container.resolve(ReplyCommentController)

commentRoutes.post('', commentPostController.execute)
commentRoutes.post('/reply', replyCommentController.execute)
