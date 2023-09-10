import { inject, injectable } from "tsyringe";

import { Service } from "@api/dtos/service";
import { Reply } from "@domains/entities/reply";
import { ReplyCommentDTO } from "../dtos/comment";
import { UserRepository } from "@infrastructures/repositories/user";
import { ReplyRepository } from "@infrastructures/repositories/reply";
import { CommentRepository } from "@infrastructures/repositories/comment";
import { ApiRequestError } from "@infrastructures/error-handling/api-request-error";
import { COMMENT_REPOSITORY_CONTAINER, USER_REPOSITORY_CONTAINER, REPLY_REPOSITORY_CONTAINER } from "@infrastructures/constants/containers";

@injectable()
export class ReplyCommentService implements Service<ReplyCommentDTO, Reply>{
  constructor(
    @inject(REPLY_REPOSITORY_CONTAINER)
    private readonly replyRepository: ReplyRepository,
    @inject(COMMENT_REPOSITORY_CONTAINER)
    private readonly commentRepository: CommentRepository,
    @inject(USER_REPOSITORY_CONTAINER)
    private readonly userRepository: UserRepository
  ) { }

  async execute({ comment_id, user_id, comment }: ReplyCommentDTO): Promise<Reply> {
    const foundUser = await this.userRepository.findById(user_id)
    if (!foundUser) throw new ApiRequestError('User not exists', 404)

    const foundComment = await this.commentRepository.findById(comment_id)
    if (!foundComment) throw new ApiRequestError('Comment not exists', 404)

    const repliedComment = await this.replyRepository.reply({
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
