import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";

import { Service } from "@api/dtos/service";
import { DeletePostDTO } from "../dtos/delete";
import { ResolveController } from "@infrastructures/decorators/resolve-controller";
import { DELETE_POST_SERVICE_CONTAINER } from "@infrastructures/constants/containers";

@injectable()
export class DeletePostController {
  constructor(
    @inject(DELETE_POST_SERVICE_CONTAINER)
    private readonly service: Service<DeletePostDTO, void>
  ) { }

  @ResolveController(DeletePostController)
  async execute(req: Request, res: Response) {
    const { id } = req.user
    const { post_id } = req.params

    await this.service.execute({ post_id, owner_id: id });

    return res.status(204).json()
  }
}
