import { FileService } from "@domains/interfaces/file-service";
import { FSFileService } from "@domains/services/file/fs-service";
import { PostRepository } from "@infrastructures/repositories/post";
import { UserRepository } from "@infrastructures/repositories/user";
import { DeletePostService } from "@api/endpoints/post/services/delete";
import { TypeormUserRepository } from "@infrastructures/typeorm/repositories/user";
import { TypeormPostRepository } from "@infrastructures/typeorm/repositories/post";
import { ApiRequestError } from "@infrastructures/error-handling/api-request-error";
import { MockClass, createMockFromClass } from "../../../../utils/create-mock-from-class";

describe('SERVICE - DeletePostService', () => {
  let postRepository: MockClass<PostRepository>;
  let userRepository: MockClass<UserRepository>;
  let fileService: MockClass<FileService>;
  let service: DeletePostService;

  beforeEach(() => {
    fileService = createMockFromClass(FSFileService as any);
    postRepository = createMockFromClass(TypeormPostRepository as any);
    userRepository = createMockFromClass(TypeormUserRepository as any);
    service = new DeletePostService(postRepository, userRepository, fileService);
  });

  describe('Successful cases', () => {
    it('should delete a post successfully', async () => {
      const owner_id = 'owner_id';
      const post_id = 'post_id';
      userRepository.findById.mockReturnValue({ id: owner_id });
      postRepository.findById.mockReturnValue({ owner_id, id: post_id, image: 'image_path' });

      await service.execute({ owner_id, post_id });

      expect(postRepository.delete).toHaveBeenCalledWith(post_id);
      expect(fileService.deleteFile).toHaveBeenCalledWith('image_path');
    });
  });

  describe('Error cases', () => {
    it('should throw an error if user does not exist', async () => {
      userRepository.findById.mockReturnValue(null);

      await expect(service.execute({ owner_id: 'owner_id', post_id: 'post_id' })).rejects.toThrow(new ApiRequestError('User not exists', 404));
    });

    it('should throw an error if post does not exist', async () => {
      userRepository.findById.mockReturnValue({ id: 'owner_id' });
      postRepository.findById.mockReturnValue(null);

      await expect(service.execute({ owner_id: 'owner_id', post_id: 'post_id' })).rejects.toThrow(new ApiRequestError('Post not exist', 404));
    });

    it('should throw an error if post owner does not match', async () => {
      userRepository.findById.mockReturnValue({ id: 'owner_id' });
      postRepository.findById.mockReturnValue({ owner_id: 'different_owner', id: 'post_id' });

      await expect(service.execute({ owner_id: 'owner_id', post_id: 'post_id' })).rejects.toThrow(new ApiRequestError('You can only delete posts that you own', 400));
    });
  });
});
