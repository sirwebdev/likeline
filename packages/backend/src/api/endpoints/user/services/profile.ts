import { inject, injectable } from "tsyringe";

import { Service } from "@api/dtos/service";
import { ProfileDTO } from "../dtos/profile";
import { UserRepository } from "@infrastructures/repositories/user";
import { FollowRepository } from "@infrastructures/repositories/follow";
import { ApiRequestError } from "@infrastructures/error-handling/api-request-error";
import { FOLLOW_REPOSITORY_CONTAINER, USER_REPOSITORY_CONTAINER } from "@infrastructures/constants/containers";

@injectable()
export class ProfileService implements Service<string, ProfileDTO> {
  constructor(
    @inject(USER_REPOSITORY_CONTAINER)
    private readonly userRepository: UserRepository,
    @inject(FOLLOW_REPOSITORY_CONTAINER)
    private readonly followRepository: FollowRepository,
  ) { }

  async execute(userID: string): Promise<ProfileDTO> {
    const foundUser = await this.userRepository.findById(userID)

    if (!foundUser) throw new ApiRequestError('User profile not exists', 404)

    const followers = await this.followRepository.getFollowers(foundUser.id)
    const following = await this.followRepository.getFollowings(foundUser.id)

    const { password: _password, ...user } = foundUser

    return {
      ...user,
      following,
      followers
    }
  }
}
