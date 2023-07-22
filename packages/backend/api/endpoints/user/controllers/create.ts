import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";


import { User } from "@api/domains/user";
import { CREATE_USER_SERVICE_CONTAINER } from "@api/api/constants/containers";
import { ResolveController } from "@api/infraestructures/decorators/resolve-controller";

import { Service } from "../dtos/service";
import { CreateUserDTO } from "../dtos/create-user";


@injectable()
export class CreateUserController {
  constructor(
    @inject(CREATE_USER_SERVICE_CONTAINER)
    private readonly service: Service<CreateUserDTO, User>
  ) { }

  @ResolveController(CreateUserController)
  async execute(req: Request, res: Response): Promise<void> {
    const { name, email, password, username, confirmPassword }: CreateUserDTO = req.body;

    const user = await this.service.execute({
      name,
      email,
      password,
      username,
      confirmPassword,
    });

    res.json(user);
  }
}
