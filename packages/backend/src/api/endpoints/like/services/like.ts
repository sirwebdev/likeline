import { inject, injectable } from "tsyringe";

import { Service } from "@api/dtos/service";
import { Like } from "@domains/entities/like";
import { LikePostDTO } from "../dtos/like-post";
import { LikeRepository } from "@infrastructures/repositories/like";
import { UserRepository } from "@infrastructures/repositories/user";
import { PostRepository } from "@infrastructures/repositories/post";
import { ApiRequestError } from "@infrastructures/error-handling/api-request-error";
import { LIKE_REPOSITORY_CONTAINER, POST_REPOSITORY_CONTAINER, USER_REPOSITORY_CONTAINER } from "@infrastructures/constants/containers";

@injectable()
export class LikeService implements Service<LikePostDTO, Like> {
  constructor(
    @inject(LIKE_REPOSITORY_CONTAINER)
    private readonly likeRepository: LikeRepository,
    @inject(USER_REPOSITORY_CONTAINER)
    private readonly userRepository: UserRepository,
    @inject(POST_REPOSITORY_CONTAINER)
    private readonly postRepository: PostRepository
  ) { }

  async execute({ post_id, user_id }: LikePostDTO): Promise<Like> {
    const foundUser = await this.userRepository.findById(user_id)
    if (!foundUser) throw new ApiRequestError('User not exists', 404)

    const foundPost = await this.postRepository.findById(post_id)
    if (!foundPost) throw new ApiRequestError('Post not exists', 404)

    const isPostLiked = await this.likeRepository.isLiked({
      user_id,
      post_id
    })

    if (isPostLiked) throw new ApiRequestError('Post already liked', 409)

    const likedPost = await this.likeRepository.create({
      post_id: foundPost.id,
      user_id: foundUser.id
    })

    return likedPost
  }
}
