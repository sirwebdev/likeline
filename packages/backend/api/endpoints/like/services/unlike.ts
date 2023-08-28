import { inject, injectable } from "tsyringe";

import { Service } from "@api/dtos/service";
import { UnLikePostDTO } from "../dtos/unlike-post";
import { LikeRepository } from "@infrastructures/repositories/like";
import { UserRepository } from "@infrastructures/repositories/user";
import { ApiRequestError } from "@infrastructures/error-handling/api-request-error";
import { LIKE_REPOSITORY_CONTAINER, USER_REPOSITORY_CONTAINER } from "@infrastructures/constants/containers";

@injectable()
export class UnLikeService implements Service<UnLikePostDTO, void> {
  constructor(
    @inject(LIKE_REPOSITORY_CONTAINER)
    private readonly likeRepository: LikeRepository,
    @inject(USER_REPOSITORY_CONTAINER)
    private readonly userRepository: UserRepository,
  ) { }

  async execute({ user_id, like_id }: UnLikePostDTO): Promise<void> {
    const foundUser = await this.userRepository.findById(user_id);
    if (!foundUser) {
      throw new ApiRequestError("User not exists.", 404);
    }

    const foundLike = await this.likeRepository.findById(like_id);
    if (!foundLike) {
      throw new ApiRequestError("Cannot unlike a non-existent like.", 404);
    }

    if (user_id !== foundLike.user_id) {
      throw new ApiRequestError("You cannot unlike someone else's like.", 403);
    }

    await this.likeRepository.delete(like_id);
  }
}
