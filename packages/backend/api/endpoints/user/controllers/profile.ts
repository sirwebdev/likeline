import { Request, Response } from "express"
import { inject, injectable } from "tsyringe";

import { Service } from "../dtos/service";
import { User } from "@domains/entities/user";
import { PROFILE_SERVICE_CONTAINER } from "@api/constants/containers";
import { ResolveController } from "@infrastructures/decorators/resolve-controller";

@injectable()
export class ProfileController {
  constructor(
    @inject(PROFILE_SERVICE_CONTAINER)
    private readonly service: Service<string, User>
  ) { }

  @ResolveController(ProfileController)
  async execute(_req: Request, res: Response) {
    const user = this.service.execute('user')

    return res.json(user)
  }
}
