import { CreatePostService } from "@api/endpoints/post/services/create";
import { PostRepository } from "@infrastructures/repositories/post";
import { UserRepository } from "@infrastructures/repositories/user";
import { FileService } from "@domains/interfaces/file-service";
import { MockClass, createMockFromClass } from "../../../../utils/create-mock-from-class";
import { ApiRequestError } from "@infrastructures/error-handling/api-request-error";
import { CreatePostDTO } from "@api/endpoints/post/dtos/create";
import { TypeormPostRepository } from '@infrastructures/typeorm/repositories/post';
import { TypeormUserRepository } from '@infrastructures/typeorm/repositories/user';
import { FSFileService } from '@domains/services/file/fs-service';
import { createUser } from '../../../../utils/create-user';

let service: CreatePostService;
let postRepository: MockClass<PostRepository>;
let userRepository: MockClass<UserRepository>;
let fileService: MockClass<FileService>;

describe("SERVICE - CreatePost", () => {
  let postPayload: CreatePostDTO;
  const USER = createUser()

  beforeEach(() => {
    postRepository = createMockFromClass(TypeormPostRepository as any);
    userRepository = createMockFromClass(TypeormUserRepository as any);
    fileService = createMockFromClass(FSFileService as any);
    service = new CreatePostService(postRepository, userRepository, fileService);
    postPayload = { title: 'Random Post', image: { originalname: 'image.jpg' }, owner: USER.id } as any as CreatePostDTO;

    userRepository.findById.mockReturnValue(USER);
  })

  describe("Successful cases", () => {
    it("Must create a new post with a valid title and image", async () => {
      userRepository.findById.mockReturnValue({ id: postPayload.owner });
      await service.execute(postPayload);
      expect(postRepository.create).toHaveBeenCalledWith(expect.objectContaining({ title: postPayload.title }));
      expect(fileService.saveFile).toHaveBeenCalledWith(postPayload.image.originalname, expect.stringContaining(postPayload.owner));
    });

    it("Must post have no one like by default", async () => {
      userRepository.findById.mockReturnValue({ id: postPayload.owner });
      const post = await service.execute(postPayload);
      expect(post.likes).toHaveLength(0);
    })
  });

  describe("Error cases", () => {
    it("Must not create a post without a title", async () => {
      postPayload.title = '';
      await expect(service.execute(postPayload)).rejects.toThrowError(new ApiRequestError('Title is required'));
    });

    it("Must not create a post without an image", async () => {
      postPayload.image = undefined!;
      await expect(service.execute(postPayload)).rejects.toThrowError(new ApiRequestError('Image is required'));
    });

    it("Must not create a post if the user does not exist", async () => {
      userRepository.findById.mockResolvedValue(null);
      await expect(service.execute(postPayload)).rejects.toThrowError(new ApiRequestError('User not exists', 404));
    });
  });
});
