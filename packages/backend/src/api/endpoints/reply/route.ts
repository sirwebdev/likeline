import { Router } from "express";
import { ReplyCommentController } from "./controllers/comment";
import { container } from "tsyringe";

export const replyRoutes = Router()

const replyCommentController = container.resolve(ReplyCommentController)

replyRoutes.post('/comment', replyCommentController.execute)
