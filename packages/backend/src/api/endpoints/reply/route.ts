import { Router } from "express";
import { ReplyCommentController } from "./controllers/comment";
import { container } from "tsyringe";
import { injectUserPhotoUrl } from "./middlewares/inject-user-photo-url";

export const replyRoutes = Router()

const replyCommentController = container.resolve(ReplyCommentController)

replyRoutes.post('/comment', replyCommentController.execute, injectUserPhotoUrl)
