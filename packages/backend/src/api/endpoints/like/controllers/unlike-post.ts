import { Request, Response } from "express"
import { inject, injectable } from "tsyringe";

import { Service } from "@api/dtos/service";
import { ResolveController } from "@infrastructures/decorators/resolve-controller";
import { UNLIKE_POST_SERVICE_CONTAINER } from "@infrastructures/constants/containers";
import { UnLikePostDTO } from "../dtos/unlike-post";

@injectable()
export class UnLikePostController {
  constructor(
    @inject(UNLIKE_POST_SERVICE_CONTAINER)
    private readonly service: Service<UnLikePostDTO, void>
  ) { }

  @ResolveController(UnLikePostController)
  async execute(req: Request, res: Response) {
    const { id } = req.user
    const { like_id } = req.params

    await this.service.execute({ user_id: id, like_id })

    return res.status(204).json()
  }
}
