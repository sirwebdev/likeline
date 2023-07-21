import { inject, injectable } from "tsyringe"

import { Service } from "../dtos/service";
import { User } from "../../../../domains/user";
import { CreateUserDTO } from "../dtos/create-user";
import { USER_REPOSITORY_CONTAINER } from "../../../constants/containers";
import { UserRepository } from "../../../infraestructures/repositories/user";

@injectable()
export class CreateUserService implements Service<CreateUserDTO, User> {
  constructor(
    @inject(USER_REPOSITORY_CONTAINER)
    private readonly userRepository: UserRepository) { }

  async execute(payload: CreateUserDTO): Promise<User> {
    const user = await this.userRepository.create(payload)

    return user
  }
}
