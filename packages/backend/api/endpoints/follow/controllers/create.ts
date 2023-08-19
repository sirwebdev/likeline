import { inject, injectable } from "tsyringe";
import { Request, Response } from "express"

import { Service } from "@api/dtos/service";
import { Follow } from "@domains/entities/follow";
import { CreateFollowDTO } from "@infrastructures/dtos/create-follow";
import { ResolveController } from "@infrastructures/decorators/resolve-controller";
import { CREATE_FOLLOW_SERVICE_CONTAINER } from "@infrastructures/constants/containers";

@injectable()
export class CreateFollowController {
  constructor(
    @inject(CREATE_FOLLOW_SERVICE_CONTAINER)
    private readonly service: Service<CreateFollowDTO, Follow>
  ) {
  }

  @ResolveController(CreateFollowController)
  async execute(req: Request, res: Response) {
    const { id } = req.user
    const { followee_id }: Pick<CreateFollowDTO, 'followee_id'> = req.body

    const follow = await this.service.execute({ followee_id, follower_id: id })

    return res.status(201).json(follow)
  }
}
