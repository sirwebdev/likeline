import { inject, injectable } from "tsyringe";

import { Service } from "@api/dtos/service";
import { CommentPostDTO } from "../dtos/post";
import { Comment } from "@domains/entities/comment";
import { UserRepository } from "@infrastructures/repositories/user";
import { PostRepository } from "@infrastructures/repositories/post";
import { CommentRepository } from "@infrastructures/repositories/comment";
import { ApiRequestError } from "@infrastructures/error-handling/api-request-error";
import { COMMENT_REPOSITORY_CONTAINER, POST_REPOSITORY_CONTAINER, USER_REPOSITORY_CONTAINER } from "@infrastructures/constants/containers";

@injectable()
export class CommentPostService implements Service<CommentPostDTO, Comment>{
  constructor(
    @inject(COMMENT_REPOSITORY_CONTAINER)
    private readonly commentRepository: CommentRepository,
    @inject(USER_REPOSITORY_CONTAINER)
    private readonly userRepository: UserRepository,
    @inject(POST_REPOSITORY_CONTAINER)
    private readonly postRepository: PostRepository
  ) { }

  async execute({ post_id, user_id, comment }: CommentPostDTO): Promise<Comment> {
    const foundUser = await this.userRepository.findById(user_id)
    if (!foundUser) throw new ApiRequestError('User not exists', 404)

    const foundPost = await this.postRepository.findById(post_id)
    if (!foundPost) throw new ApiRequestError('Post not exists', 404)

    const post = await this.commentRepository.create({
      post_id: foundPost.id,
      user: {
        id: foundUser.id,
        username: foundUser.username,
        photo_filename: foundUser.photo_filename
      },
      comment
    })

    return post
  }
}
