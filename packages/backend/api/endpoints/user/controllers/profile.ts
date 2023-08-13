import { Request, Response } from "express"
import { inject, injectable } from "tsyringe";

import { Service } from "../dtos/service";
import { ProfileDTO } from "../dtos/profile";
import { PROFILE_SERVICE_CONTAINER } from "@infrastructures/constants/containers";
import { ResolveController } from "@infrastructures/decorators/resolve-controller";

@injectable()
export class ProfileController {
  constructor(
    @inject(PROFILE_SERVICE_CONTAINER)
    private readonly service: Service<string, ProfileDTO>
  ) { }

  @ResolveController(ProfileController)
  async execute(req: Request, res: Response) {
    const { id } = req.user

    const user = await this.service.execute(id)

    return res.json(user)
  }
}
