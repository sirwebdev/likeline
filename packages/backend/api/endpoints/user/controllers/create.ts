import { Request, Response } from "express";
import { CreateUserDTO } from "../dtos/create-user";
import { Service } from "../dtos/service";
import { User } from "../../../../domains/user";
import { inject, injectable } from "tsyringe";
import { CREATE_USER_SERVICE_CONTAINER } from "../../../constants/containers";
import { ResolveController } from "../../../infraestructures/decorators/resolve-controller";

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
