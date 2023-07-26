import { inject, injectable } from "tsyringe"

import { Service } from "../dtos/service"
import { CreateUserDTO } from "../dtos/create-user"

import { User } from "@domains/entities/user"
import { UserRepository } from "@infraestructures/repositories/user"
import { USER_REPOSITORY_CONTAINER } from "@api/constants/containers"

@injectable()
export class CreateUserService implements Service<CreateUserDTO, User> {
  constructor(
    @inject(USER_REPOSITORY_CONTAINER)
    private readonly userRepository: UserRepository) { }

  async execute(payload: CreateUserDTO): Promise<User> {
    const { confirmPassword, ...threatedPayload } = payload

    if (confirmPassword !== threatedPayload.password) throw new Error('Confirm password does not match with password')

    const foundUserEmail = await this.userRepository.findByEmail(threatedPayload.email);
    if (foundUserEmail) throw new Error('User already exists with this email')

    const foundUserUsername = await this.userRepository.findByUsername(threatedPayload.username);
    if (foundUserUsername) throw new Error('User already exists with this username')

    const user = await this.userRepository.create(threatedPayload)

    return user
  }
}
