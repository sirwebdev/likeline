import { Request, Response } from "express"
import { inject, injectable } from "tsyringe";

import { Service } from "../dtos/service";
import { ProfileDTO } from "../dtos/profile";
import { IdType } from "@infrastructures/typeorm/entities/user";
import { PROFILE_SERVICE_CONTAINER } from "@api/constants/containers";
import { ResolveController } from "@infrastructures/decorators/resolve-controller";

@injectable()
export class ProfileController {
  constructor(
    @inject(PROFILE_SERVICE_CONTAINER)
    private readonly service: Service<IdType, ProfileDTO>
  ) { }

  @ResolveController(ProfileController)
  async execute(_req: Request, res: Response) {
    const user = await this.service.execute('user' as unknown as IdType)

    return res.json(user)
  }
}
