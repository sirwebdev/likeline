import { Request, Response } from "express"
import { inject, injectable } from "tsyringe";

import { Service } from "@api/dtos/service";
import { CommentPostDTO } from "../dtos/post";
import { Comment } from "@domains/entities/comment"
import { ResolveController } from "@infrastructures/decorators/resolve-controller";
import { COMMENT_POST_SERVICE_CONTAINER } from "@infrastructures/constants/containers";

@injectable()
export class CommentPostController {
  constructor(
    @inject(COMMENT_POST_SERVICE_CONTAINER)
    private readonly service: Service<CommentPostDTO, Comment>
  ) { }

  @ResolveController(CommentPostController)
  async execute(req: Request, res: Response) {
    const { post_id, comment } = req.body;
    const { id } = req.user

    const createdComment = await this.service.execute({
      comment,
      post_id,
      user_id: id
    })

    return res.status(201).json(createdComment)
  }
}
