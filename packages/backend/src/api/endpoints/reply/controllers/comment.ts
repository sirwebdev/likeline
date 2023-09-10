import { NextFunction, Request, Response } from "express"
import { inject, injectable } from "tsyringe";

import { Service } from "@api/dtos/service";
import { Reply } from "@domains/entities/reply";
import { ReplyCommentDTO } from "../dtos/comment";
import { ResolveController } from "@infrastructures/decorators/resolve-controller";
import { REPLY_COMMENT_SERVICE_CONTAINER } from "@infrastructures/constants/containers";

@injectable()
export class ReplyCommentController {
  constructor(
    @inject(REPLY_COMMENT_SERVICE_CONTAINER)
    private readonly service: Service<ReplyCommentDTO, Reply>
  ) { }

  @ResolveController(ReplyCommentController)
  async execute(req: Request, res: Response, next: NextFunction) {
    const { comment_id, comment } = req.body;
    const { id } = req.user

    const createdComment = await this.service.execute({
      comment,
      comment_id,
      user_id: id
    })

    res.status(201)

    res.locals.reply = createdComment
    next()
  }
}
