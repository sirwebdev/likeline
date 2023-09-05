import { createUser } from "../../../../utils/create-user";
import { UserRepository } from "@infrastructures/repositories/user";
import { UnFollowService } from "@api/endpoints/follow/services/unfollow";
import { FollowRepository } from "@infrastructures/repositories/follow";
import { TypeormUserRepository } from "@infrastructures/typeorm/repositories/user";
import { TypeormFollowRepository } from "@infrastructures/typeorm/repositories/follow";
import { MockClass, createMockFromClass } from "../../../../utils/create-mock-from-class";
import { DeleteFollowDTO } from "@infrastructures/dtos/delete-follow";

let service: UnFollowService;
let userRepository: MockClass<UserRepository>;
let followRepository: MockClass<FollowRepository>;

let follower = createUser()
let followee = createUser()

describe("SERVICE - UnFollowService", () => {
  let unFollowPayload: DeleteFollowDTO;

  beforeEach(() => {
    userRepository = createMockFromClass(TypeormUserRepository as any);
    followRepository = createMockFromClass(TypeormFollowRepository as any);
    service = new UnFollowService(followRepository, userRepository);
    unFollowPayload = { follower_id: follower.id, followee_id: followee.id };
  });

  describe("Successful cases", () => {
    it("Must unfollow if user already is following", async () => {
      userRepository.findById.mockResolvedValue(followee);
      followRepository.checkIsFollowing.mockResolvedValue(true);

      await service.execute(unFollowPayload);

      expect(followRepository.delete).toHaveBeenCalledWith(expect.objectContaining(unFollowPayload));
    });
  });

  describe("Error cases", () => {
    it("Must not allow user to follow themselves", async () => {
      const wrongPayload = { follower_id: follower.id, followee_id: follower.id };
      await expect(service.execute(wrongPayload)).rejects.toThrowError('You cannot unfollow yourself');
    });

    it("Must not allow following if follower not found", async () => {
      userRepository.findById.mockResolvedValue(undefined);
      await expect(service.execute(unFollowPayload)).rejects.toThrowError('Follower not found');
    });

    it("Must not allow following if followee not found", async () => {
      userRepository.findById.mockResolvedValueOnce(follower).mockResolvedValueOnce(undefined);
      await expect(service.execute(unFollowPayload)).rejects.toThrowError('Followee not found');
    });

    it("Must not allow following if already following this user", async () => {
      userRepository.findById.mockResolvedValue(follower);
      followRepository.checkIsFollowing.mockResolvedValue(false);
      await expect(service.execute(unFollowPayload)).rejects.toThrowError('You are already not following this user');
    });
  });
});
