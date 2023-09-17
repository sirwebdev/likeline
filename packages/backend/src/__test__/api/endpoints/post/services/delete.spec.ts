import { User } from "@domains/entities/user";
import { Post } from "@domains/entities/post";
import { createPost } from "../../../../utils/create-post";
import { createUser } from "../../../../utils/create-user";
import { FileService } from "@domains/interfaces/file-service";
import { FSFileService } from "@domains/services/file/fs-service";
import { PostRepository } from "@infrastructures/repositories/post";
import { UserRepository } from "@infrastructures/repositories/user";
import { ReplyRepository } from "@infrastructures/repositories/reply";
import { DeletePostService } from "@api/endpoints/post/services/delete";
import { CommentRepository } from "@infrastructures/repositories/comment";
import { TypeormUserRepository } from "@infrastructures/typeorm/repositories/user";
import { TypeormPostRepository } from "@infrastructures/typeorm/repositories/post";
import { ApiRequestError } from "@infrastructures/error-handling/api-request-error";
import { TypeormReplyRepository } from "@infrastructures/typeorm/repositories/reply";
import { TypeormCommentRepository } from "@infrastructures/typeorm/repositories/comment";
import { MockClass, createMockFromClass } from "../../../../utils/create-mock-from-class";
import { createComment } from "../../../../utils/create-comment";
import { createReply } from "../../../../utils/create-reply";

describe('SERVICE - DeletePostService', () => {
  let service: DeletePostService;
  let fileService: MockClass<FileService>;
  let postRepository: MockClass<PostRepository>;
  let userRepository: MockClass<UserRepository>;
  let replyRepository: MockClass<ReplyRepository>;
  let commentRepository: MockClass<CommentRepository>;

  let user: User;
  let post: Post;

  beforeEach(() => {
    fileService = createMockFromClass(FSFileService as any);
    postRepository = createMockFromClass(TypeormPostRepository as any);
    userRepository = createMockFromClass(TypeormUserRepository as any);
    replyRepository = createMockFromClass(TypeormReplyRepository as any);
    commentRepository = createMockFromClass(TypeormCommentRepository as any);
    service = new DeletePostService(postRepository, userRepository, commentRepository, replyRepository, fileService);

    user = createUser()
    const createdPost = createPost(user.id, '')

    post = createdPost
  });

  describe('Successful cases', () => {
    beforeEach(() => {
      userRepository.findById.mockReturnValue(user);
      postRepository.findById.mockReturnValue({ ...post });
      commentRepository.getByPostId.mockReturnValue(Array.from({ length: Math.floor(Math.random() * 100) + 1 }).map(() => createComment(post.id, user.id)))
      replyRepository.getRepliesByCommentId.mockReturnValue(Array.from({ length: Math.floor(Math.random() * 100) + 1 }).map(() => createReply('comment_id')))
    })

    it('Must delete a post successfully', async () => {
      await service.execute({ owner_id: user.id, post_id: post.id });

      expect(postRepository.delete).toHaveBeenCalledWith(post.id);
      expect(fileService.deleteFile).toHaveBeenCalledWith(post.image);
    });

    it('Must delete all post comment to delete post', async () => {
      await service.execute({ owner_id: user.id, post_id: post.id })

      expect(commentRepository.deleteAllByPostId).toHaveBeenCalledWith(post.id)
    })

    it('Must delete all post comment replies to delete post', async () => {
      await service.execute({ owner_id: user.id, post_id: post.id })

      post.comments.forEach(comment => {
        expect(replyRepository.deleteAllByCommentId).toHaveBeenCalledWith(comment.id)
      })
    })
  });

  describe('Error cases', () => {
    it('Must throw an error if user does not exist', async () => {
      userRepository.findById.mockReturnValue(undefined);

      await expect(service.execute({ owner_id: 'owner_id', post_id: 'post_id' })).rejects.toThrow(new ApiRequestError('User not exists', 404));
    });

    it('Must throw an error if post does not exist', async () => {
      userRepository.findById.mockReturnValue(user);
      postRepository.findById.mockReturnValue(undefined);

      await expect(service.execute({ owner_id: 'owner_id', post_id: 'post_id' })).rejects.toThrow(new ApiRequestError('Post not exist', 404));
    });

    it('Must throw an error if post owner does not match', async () => {
      userRepository.findById.mockReturnValue(user);
      postRepository.findById.mockReturnValue({ ...post, owner_id: 'other_owner_id' });

      await expect(service.execute({ owner_id: 'owner_id', post_id: 'post_id' })).rejects.toThrow(new ApiRequestError('You can only delete posts that you own', 400));
    });
  });
});
