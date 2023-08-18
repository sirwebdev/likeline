import { inject, injectable } from "tsyringe"

import { CreateUserDTO } from "../dtos/create-user"

import { Service } from "@api/dtos/service"
import { User } from "@domains/entities/user"
import { UserRepository } from "@infrastructures/repositories/user"
import { EncryptionService } from "@domains/interfaces/encription-service"
import { ApiRequestError } from "@infrastructures/error-handling/api-request-error"
import { ENCRYPTION_SERVICE_CONTAINER, USER_REPOSITORY_CONTAINER } from "@infrastructures/constants/containers"

@injectable()
export class CreateUserService implements Service<CreateUserDTO, User> {
  constructor(
    @inject(USER_REPOSITORY_CONTAINER)
    private readonly userRepository: UserRepository,
    @inject(ENCRYPTION_SERVICE_CONTAINER)
    private readonly encryptionService: EncryptionService
  ) { }

  async execute(payload: CreateUserDTO): Promise<User> {
    const { confirmPassword, ...threatedPayload } = payload

    if (confirmPassword !== threatedPayload.password) throw new ApiRequestError('Confirm password does not match with password', 400)

    const foundUserEmail = await this.userRepository.findByEmail(threatedPayload.email);
    if (foundUserEmail) throw new ApiRequestError('User already exists with this email', 409)

    const foundUserUsername = await this.userRepository.findByUsername(threatedPayload.username);
    if (foundUserUsername) throw new ApiRequestError('User already exists with this username', 409)

    const { password } = threatedPayload

    const encryptedPassword = await this.encryptionService.hashPassword(password)

    const user = await this.userRepository.create({
      ...threatedPayload,
      password: encryptedPassword
    })

    return user
  }
}
