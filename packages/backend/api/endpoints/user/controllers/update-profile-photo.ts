import { Request, Response } from "express"
import { inject, injectable } from "tsyringe";

import { Service } from "../dtos/service";
import { User } from "@domains/entities/user";
import { UpdateProfilePhotoDTO } from "../dtos/update-profile-photo";
import { ResolveController } from "@infrastructures/decorators/resolve-controller";
import { UPDATE_PROFILE_PHOTO_SERVICE_CONTAINER } from "@infrastructures/constants/containers";

@injectable()
export class UpdateProfilePhotoController {
  constructor(
    @inject(UPDATE_PROFILE_PHOTO_SERVICE_CONTAINER)
    private readonly service: Service<UpdateProfilePhotoDTO, User>
  ) { }

  @ResolveController(UpdateProfilePhotoController)
  async execute(req: Request, res: Response) {
    const { id } = req.user
    const { originalname } = req.file!

    const updatedUser = await this.service.execute({ userID: id, tempFilename: originalname })

    return res.json(updatedUser)
  }
}
