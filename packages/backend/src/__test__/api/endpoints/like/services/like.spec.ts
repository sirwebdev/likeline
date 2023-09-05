import { createUser } from "../../../../utils/create-user";
import { createPost } from "../../../../utils/create-post";
import { createLike } from "../../../../utils/create-like";
import { LikeService } from "@api/endpoints/like/services/like";
import { LikePostDTO } from "@api/endpoints/like/dtos/like-post";
import { UserRepository } from "@infrastructures/repositories/user";
import { LikeRepository } from "@infrastructures/repositories/like";
import { PostRepository } from "@infrastructures/repositories/post";
import { TypeormUserRepository } from "@infrastructures/typeorm/repositories/user";
import { TypeormLikeRepository } from "@infrastructures/typeorm/repositories/like";
import { TypeormPostRepository } from "@infrastructures/typeorm/repositories/post";
import { ApiRequestError } from "@infrastructures/error-handling/api-request-error";
import { MockClass, createMockFromClass } from "../../../../utils/create-mock-from-class";

let service: LikeService;
let userRepository: MockClass<UserRepository>;
let likeRepository: MockClass<LikeRepository>;
let postRepository: MockClass<PostRepository>;

describe("SERVICE - Like", () => {
  let likePayload: LikePostDTO;
  const USER = createUser();
  const POST = createPost(USER.id);
  const EXISTING_LIKE = createLike(USER.id, POST.id);

  beforeEach(() => {
    userRepository = createMockFromClass(TypeormUserRepository as any);
    likeRepository = createMockFromClass(TypeormLikeRepository as any);
    postRepository = createMockFromClass(TypeormPostRepository as any);
    service = new LikeService(likeRepository, userRepository, postRepository);
    likePayload = { post_id: POST.id, user_id: USER.id };
  });

  describe("Successful cases", () => {
    beforeEach(() => {
      userRepository.findById.mockResolvedValue(USER);
      postRepository.findById.mockResolvedValue(POST);
      likeRepository.isLiked.mockResolvedValue(false);
      likeRepository.create.mockResolvedValue(EXISTING_LIKE);
    });

    it("Must like a post if user has not liked it", async () => {
      await expect(service.execute(likePayload)).resolves.toEqual(EXISTING_LIKE);
      expect(likeRepository.create).toHaveBeenCalledWith({
        post_id: POST.id,
        user_id: USER.id
      });
    });
  });

  describe("Error cases", () => {
    it("Must not like a post if user has already liked it", async () => {
      userRepository.findById.mockResolvedValue(USER);
      postRepository.findById.mockResolvedValue(POST);
      likeRepository.isLiked.mockResolvedValue(true);

      await expect(service.execute(likePayload)).rejects.toThrowError(ApiRequestError);
    });

    it("Must not like a post if user not found", async () => {
      userRepository.findById.mockResolvedValue(undefined);

      await expect(service.execute(likePayload)).rejects.toThrowError(ApiRequestError);
    });

    it("Must not like a post if post not found", async () => {
      userRepository.findById.mockResolvedValue(USER);
      postRepository.findById.mockResolvedValue(undefined);

      await expect(service.execute(likePayload)).rejects.toThrowError(ApiRequestError);
    });
  });
});
