import { Request, Response } from "express"
import { inject, injectable } from "tsyringe";

import { Service } from "@api/dtos/service";
import { ReplyCommentDTO } from "../dtos/reply";
import { Comment } from "@domains/entities/comment"
import { ResolveController } from "@infrastructures/decorators/resolve-controller";
import { REPLY_COMMENT_SERVICE_CONTAINER } from "@infrastructures/constants/containers";

@injectable()
export class ReplyCommentController {
  constructor(
    @inject(REPLY_COMMENT_SERVICE_CONTAINER)
    private readonly service: Service<ReplyCommentDTO, Comment>
  ) { }

  @ResolveController(ReplyCommentController)
  async execute(req: Request, res: Response) {
    const { comment_id, comment } = req.body;
    const { id } = req.user

    const createdComment = await this.service.execute({
      comment,
      comment_id,
      user_id: id
    })

    return res.status(201).json(createdComment)
  }
}
