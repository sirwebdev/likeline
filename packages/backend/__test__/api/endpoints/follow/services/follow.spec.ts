import { createUser } from "../../../../utils/create-user";
import { UserRepository } from "@infrastructures/repositories/user";
import { FollowService } from "@api/endpoints/follow/services/follow";
import { FollowRepository } from "@infrastructures/repositories/follow";
import { CreateFollowDTO } from "@api/endpoints/follow/dtos/create-follow";
import { TypeormUserRepository } from "@infrastructures/typeorm/repositories/user";
import { TypeormFollowRepository } from "@infrastructures/typeorm/repositories/follow";
import { MockClass, createMockFromClass } from "../../../../utils/create-mock-from-class";

let service: FollowService;
let userRepository: MockClass<UserRepository>;
let followRepository: MockClass<FollowRepository>;

let follower = createUser()
let followee = createUser()

describe("SERVICE - CreateFollow", () => {
  let followPayload: CreateFollowDTO;

  beforeEach(() => {
    userRepository = createMockFromClass(TypeormUserRepository as any);
    followRepository = createMockFromClass(TypeormFollowRepository as any);
    service = new FollowService(followRepository, userRepository);
    followPayload = { follower_id: follower.id, followee_id: followee.id };
  });

  describe("Successful cases", () => {
    it("Must create a follow relationship if not already following", async () => {
      userRepository.findById.mockResolvedValue(followee);
      followRepository.checkIsFollowing.mockResolvedValue(false);
      await service.execute(followPayload);
      expect(followRepository.create).toHaveBeenCalledWith(expect.objectContaining(followPayload));
    });
  });

  describe("Error cases", () => {
    it("Must not allow user to follow themselves", async () => {
      const wrongPayload = { follower_id: follower.id, followee_id: follower.id };
      await expect(service.execute(wrongPayload)).rejects.toThrowError('You cannot follow yourself');
    });

    it("Must not allow following if follower not found", async () => {
      userRepository.findById.mockResolvedValue(undefined);
      await expect(service.execute(followPayload)).rejects.toThrowError('Follower not found');
    });

    it("Must not allow following if followee not found", async () => {
      userRepository.findById.mockResolvedValueOnce(follower).mockResolvedValueOnce(undefined);
      await expect(service.execute(followPayload)).rejects.toThrowError('Followee not found');
    });

    it("Must not allow following if already following this user", async () => {
      userRepository.findById.mockResolvedValue(follower);
      followRepository.checkIsFollowing.mockResolvedValue(true);
      await expect(service.execute(followPayload)).rejects.toThrowError('You are already following this user');
    });
  });
});
