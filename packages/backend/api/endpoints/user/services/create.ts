import { inject, injectable } from "tsyringe"

import { Service } from "../dtos/service"
import { CreateUserDTO } from "../dtos/create-user"

import { User } from "@api/domains/user"
import { UserRepository } from "@api/infraestructures/repositories/user"
import { USER_REPOSITORY_CONTAINER } from "@api/api/constants/containers"


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
