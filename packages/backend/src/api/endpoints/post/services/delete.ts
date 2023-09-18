import { inject, injectable } from "tsyringe";

import { Service } from "@api/dtos/service";
import { FileService } from "@domains/interfaces/file-service";
import { DeletePostDTO } from "@api/endpoints/post/dtos/delete";
import { UserRepository } from "@infrastructures/repositories/user";
import { PostRepository } from "@infrastructures/repositories/post";
import { ReplyRepository } from "@infrastructures/repositories/reply";
import { CommentRepository } from "@infrastructures/repositories/comment";
import { ApiRequestError } from "@infrastructures/error-handling/api-request-error";
import { COMMENT_REPOSITORY_CONTAINER, FILE_SERVICE_CONTAINER, POST_REPOSITORY_CONTAINER, REPLY_REPOSITORY_CONTAINER, USER_REPOSITORY_CONTAINER } from "@infrastructures/constants/containers";

@injectable()
export class DeletePostService implements Service<DeletePostDTO, void> {
  constructor(
    @inject(POST_REPOSITORY_CONTAINER)
    private readonly postRepository: PostRepository,
    @inject(USER_REPOSITORY_CONTAINER)
    private readonly userRepository: UserRepository,
    @inject(COMMENT_REPOSITORY_CONTAINER)
    private readonly commentRepository: CommentRepository,
    @inject(REPLY_REPOSITORY_CONTAINER)
    private readonly replyRepository: ReplyRepository,
    @inject(FILE_SERVICE_CONTAINER)
    private readonly fileService: FileService,
  ) { }

  async execute({ owner_id, post_id }: DeletePostDTO): Promise<void> {
    const foundUser = await this.userRepository.findById(owner_id)
    if (!foundUser) throw new ApiRequestError('User not exists', 404)

    const foundPost = await this.postRepository.findById(post_id)
    if (!foundPost) throw new ApiRequestError('Post not exist', 404)

    if (foundPost.owner_id !== owner_id) throw new ApiRequestError('You can only delete posts that you own', 403)

    const postComments = await this.commentRepository.getByPostId(foundPost.id)

    const deleteAllRepliesPromises = postComments.map(comment => this.replyRepository.deleteAllByCommentId(comment.id))
    await Promise.all(deleteAllRepliesPromises)

    await this.commentRepository.deleteAllByPostId(foundPost.id)
    await this.postRepository.delete(post_id);
    await this.fileService.deleteFile(foundPost.image)
  }
}
