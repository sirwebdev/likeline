import { Request, Response } from "express"
import { inject, injectable } from "tsyringe";

import { Service } from "@api/dtos/service";
import { Like } from "@domains/entities/like";
import { LikePostDTO } from "../dtos/like-post";
import { ResolveController } from "@infrastructures/decorators/resolve-controller";
import { LIKE_POST_SERVICE_CONTAINER } from "@infrastructures/constants/containers";

@injectable()
export class LikePostController {
  constructor(
    @inject(LIKE_POST_SERVICE_CONTAINER)
    private readonly service: Service<LikePostDTO, Like>
  ) { }

  @ResolveController(LikePostController)
  async execute(req: Request, res: Response) {
    const { id } = req.user
    const { post_id } = req.params

    const likedPost = await this.service.execute({ user_id: id, post_id })

    return res.json(likedPost)
  }
}
