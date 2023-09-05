import { createUser } from "../../../../utils/create-user";
import { createPost } from "../../../../utils/create-post";
import { createLike } from "../../../../utils/create-like";
import { UnLikeService } from "@api/endpoints/like/services/unlike";
import { UserRepository } from "@infrastructures/repositories/user";
import { LikeRepository } from "@infrastructures/repositories/like";
import { UnLikePostDTO } from "@api/endpoints/like/dtos/unlike-post";
import { TypeormUserRepository } from "@infrastructures/typeorm/repositories/user";
import { TypeormLikeRepository } from "@infrastructures/typeorm/repositories/like";
import { ApiRequestError } from "@infrastructures/error-handling/api-request-error";
import { MockClass, createMockFromClass } from "../../../../utils/create-mock-from-class";

let service: UnLikeService;
let userRepository: MockClass<UserRepository>;
let likeRepository: MockClass<LikeRepository>;

describe("SERVICE - UnLike", () => {
  let unlikePayload: UnLikePostDTO;
  const USER = createUser();
  const POST = createPost(USER.id);
  const LIKE = createLike(USER.id, POST.id);

  beforeEach(() => {
    userRepository = createMockFromClass(TypeormUserRepository as any);
    likeRepository = createMockFromClass(TypeormLikeRepository as any);
    service = new UnLikeService(likeRepository, userRepository);
    unlikePayload = { like_id: LIKE.id, user_id: USER.id };
  });

  describe("Successful cases", () => {
    it("Must unlike a post if user has already liked it", async () => {
      userRepository.findById.mockResolvedValue(USER);
      likeRepository.findById.mockResolvedValue(LIKE);

      await expect(service.execute(unlikePayload)).resolves.toBeUndefined();

      expect(likeRepository.delete).toHaveBeenCalledWith(LIKE.id);
    });
  });

  describe("Error cases", () => {
    it("Must not unlike a post if user has not liked it", async () => {
      userRepository.findById.mockResolvedValue(USER);
      likeRepository.findById.mockResolvedValue(undefined);

      await expect(service.execute(unlikePayload)).rejects.toThrowError(ApiRequestError);
    });

    it("Must not unlike a post if user not found", async () => {
      userRepository.findById.mockResolvedValue(undefined);

      await expect(service.execute(unlikePayload)).rejects.toThrowError(ApiRequestError);
    });
  });
});
