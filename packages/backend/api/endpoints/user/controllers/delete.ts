import { Request, Response } from "express"
import { inject, injectable } from "tsyringe";

import { Service } from "../dtos/service";
import { DELETE_USER_SERVICE_CONTAINER } from "@api/constants/containers";
import { ResolveController } from "@infrastructures/decorators/resolve-controller";

@injectable()
export class DeleteUserController {
  constructor(
    @inject(DELETE_USER_SERVICE_CONTAINER)
    private readonly service: Service<string, void>
  ) { }

  @ResolveController(DeleteUserController)
  async execute(req: Request, res: Response) {
    const { id } = req.user

    await this.service.execute(id)

    return res.status(204).json()
  }
}
