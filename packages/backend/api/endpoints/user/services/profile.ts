import { inject, injectable } from "tsyringe";

import { Service } from "@api/dtos/service";
import { ProfileDTO } from "../dtos/profile";
import { UserRepository } from "@infrastructures/repositories/user";
import { USER_REPOSITORY_CONTAINER } from "@infrastructures/constants/containers";
import { ApiRequestError } from "@infrastructures/error-handling/api-request-error";

@injectable()
export class ProfileService implements Service<string, ProfileDTO> {
  constructor(
    @inject(USER_REPOSITORY_CONTAINER)
    private readonly userRepository: UserRepository
  ) { }

  async execute(userID: string): Promise<ProfileDTO> {
    const foundUser = await this.userRepository.findById(userID)


    if (!foundUser) throw new ApiRequestError('User profile not exists', 404)

    const { password: _password, ...user } = foundUser

    return user
  }
}
