import { Request, Response } from "express"
import { inject, injectable } from "tsyringe";

import { Service } from "@api/dtos/service";
import { DeleteFollowDTO } from "@infrastructures/dtos/delete-follow";
import { ResolveController } from "@infrastructures/decorators/resolve-controller";
import { DELETE_FOLLOW_SERVICE_CONTAINER } from "@infrastructures/constants/containers";

@injectable()
export class UnFollowController {
  constructor(
    @inject(DELETE_FOLLOW_SERVICE_CONTAINER)
    private readonly service: Service<DeleteFollowDTO, void>
  ) {
  }

  @ResolveController(UnFollowController)
  async execute(req: Request, res: Response) {
    const { id } = req.user
    const { followee_id }: Pick<DeleteFollowDTO, 'followee_id'> = req.body

    await this.service.execute({ followee_id, follower_id: id })

    return res.status(204).json()
  }
}
