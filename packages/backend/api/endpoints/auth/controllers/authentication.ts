import { Request, Response } from "express"

import { inject, injectable } from "tsyringe";
import { Service } from "@api/dtos/service";
import { AuthenticationDTO } from "../dtos/authentication";
import { ResolveController } from "@infrastructures/decorators/resolve-controller";
import { AUTHENTICATION_SERVICE_CONTAINER } from "@infrastructures/constants/containers";

@injectable()
export class AuthController {
  constructor(
    @inject(AUTHENTICATION_SERVICE_CONTAINER)
    private readonly service: Service<AuthenticationDTO, string>
  ) { }

  @ResolveController(AuthController)
  async execute(req: Request, res: Response) {
    const { password, email }: AuthenticationDTO = req.body

    const token = await this.service.execute({ email, password })

    return res.json({ token })
  }

} 
