import { inject, injectable } from "tsyringe";

import { Service } from "@api/dtos/service";
import { Follow } from "@domains/entities/follow";
import { UserRepository } from "@infrastructures/repositories/user";
import { CreateFollowDTO } from "@infrastructures/dtos/create-follow";
import { FollowRepository } from "@infrastructures/repositories/follow";
import { ApiRequestError } from "@infrastructures/error-handling/api-request-error";
import { FOLLOW_REPOSITORY_CONTAINER, USER_REPOSITORY_CONTAINER } from "@infrastructures/constants/containers";

@injectable()
export class CreateFollowService implements Service<CreateFollowDTO, Follow>{
  constructor(
    @inject(FOLLOW_REPOSITORY_CONTAINER)
    private readonly followRepository: FollowRepository,
    @inject(USER_REPOSITORY_CONTAINER)
    private readonly userRepostitory: UserRepository
  ) { }


  async execute({ follower_id, followee_id }: CreateFollowDTO): Promise<Follow> {
    if (follower_id === followee_id) throw new ApiRequestError('You cannot follow yourself', 400)

    const follower = await this.userRepostitory.findById(follower_id)
    if (!follower) throw new ApiRequestError('Follower not found', 404)

    const followee = await this.userRepostitory.findById(followee_id)
    if (!followee) throw new ApiRequestError('Followee not found', 404)

    const isFollowerFollowingFollowee = await this.followRepository.checkIsFollowing(follower_id, followee_id)
    if (isFollowerFollowingFollowee) throw new ApiRequestError('You are already following this user', 409)

    const follow = await this.followRepository.create({ followee_id, follower_id })

    return follow
  }
}
