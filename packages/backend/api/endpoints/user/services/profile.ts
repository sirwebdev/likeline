import { inject, injectable } from "tsyringe";

import { Service } from "../dtos/service";
import { ProfileDTO } from "../dtos/profile";
import { IdType } from "@infrastructures/typeorm/entities/user";
import { UserRepository } from "@infrastructures/repositories/user";
import { USER_REPOSITORY_CONTAINER } from "@infrastructures/constants/containers";
import { ApiRequestError } from "@infrastructures/error-handling/api-request-error";

@injectable()
export class ProfileService implements Service<IdType, ProfileDTO> {
  constructor(
    @inject(USER_REPOSITORY_CONTAINER)
    private readonly userRepository: UserRepository
  ) { }

  async execute(userID: IdType): Promise<ProfileDTO> {
    const foundUser = await this.userRepository.findById(userID)


    if (!foundUser) throw new ApiRequestError('User profile not exists', 404)

    const { password: _password, ...user } = foundUser

    return user
  }
}
