import { inject, injectable } from "tsyringe";

import { Service } from "@api/dtos/service";
import { ReplyCommentDTO } from "../dtos/reply";
import { Comment } from "@domains/entities/comment";
import { UserRepository } from "@infrastructures/repositories/user";
import { CommentRepository } from "@infrastructures/repositories/comment";
import { ApiRequestError } from "@infrastructures/error-handling/api-request-error";
import { COMMENT_REPOSITORY_CONTAINER, USER_REPOSITORY_CONTAINER } from "@infrastructures/constants/containers";

@injectable()
export class ReplyCommentService implements Service<ReplyCommentDTO, Comment>{
  constructor(
    @inject(COMMENT_REPOSITORY_CONTAINER)
    private readonly commentRepository: CommentRepository,
    @inject(USER_REPOSITORY_CONTAINER)
    private readonly userRepository: UserRepository
  ) { }

  async execute({ comment_id, user_id, comment }: ReplyCommentDTO): Promise<Comment> {
    const foundUser = await this.userRepository.findById(user_id)
    if (!foundUser) throw new ApiRequestError('User not exists', 404)

    const foundComment = await this.commentRepository.findById(comment_id)
    if (!foundComment) throw new ApiRequestError('Comment not exists', 404)

    const repliedComment = await this.commentRepository.reply({
      comment_id,
      user: {
        id: foundUser.id,
        username: foundUser.username,
        photo_filename: foundUser.photo_filename
      },
      comment
    })

    return repliedComment
  }
}
