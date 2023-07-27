import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";

import { Service } from "../dtos/service";
import { CreateUserDTO } from "../dtos/create-user";

import { User } from "@domains/entities/user";
import { CREATE_USER_SERVICE_CONTAINER } from "@api/constants/containers";
import { ResolveController } from "@infraestructures/decorators/resolve-controller";


@injectable()
export class CreateUserController {
  constructor(
    @inject(CREATE_USER_SERVICE_CONTAINER)
    private readonly service: Service<CreateUserDTO, User>
  ) { }

  @ResolveController(CreateUserController)
  async execute(req: Request, res: Response) {
    const { name, email, password, username, confirmPassword }: CreateUserDTO = req.body;

    const user = await this.service.execute({
      name,
      email,
      password,
      username,
      confirmPassword,
    });

    const { password: _, ...userWithoutPassword } = user

    return res.status(201).json(userWithoutPassword);
  }
}
