import { User } from "@domains/entities/user"
import { UserRepository } from "@infrastructures/repositories/user"
import { ProfileService } from "@api/endpoints/user/services/profile"
import { TypeormUserRepository } from "@infrastructures/typeorm/repositories/user"
import { createUniqueUserPayload } from "../../../../utils/create-unique-user-payload"
import { MockClass, createMockFromClass } from "../../../../utils/create-mock-from-class"
import { ApiRequestError } from "@infrastructures/error-handling/api-request-error"
import { TypeormFollowRepository } from "@infrastructures/typeorm/repositories/follow"
import { FollowRepository } from "@infrastructures/repositories/follow"

let service: ProfileService
let userRepository: MockClass<UserRepository>
let followRepository: MockClass<FollowRepository>

describe("SERVICE - Profile", () => {
  const user: User = {
    id: 'user_ID',
    ...createUniqueUserPayload()
  }

  beforeEach(async () => {
    userRepository = createMockFromClass(TypeormUserRepository as any)
    followRepository = createMockFromClass(TypeormFollowRepository as any)

    service = new ProfileService(userRepository, followRepository)

    userRepository.findById.mockReturnValue(user)
  })


  describe("Successful cases", () => {
    it("must show user profile by user id", async () => {
      const userProfile = await service.execute(user.id)

      const { password: _password, ...threatedUser } = user

      expect(userProfile).toEqual(expect.objectContaining(threatedUser))
    })

    it("must show user following", async () => {
      const userProfile = await service.execute(user.id)

      expect(userProfile).toHaveProperty('following')
    })

    it("must show user followers", async () => {
      const userProfile = await service.execute(user.id)

      expect(userProfile).toHaveProperty('followers')
    })
  })

  describe("Error cases", () => {
    it("must not show user profile if user not exists", async () => {
      userRepository.findById.mockReturnValueOnce(undefined)

      await expect(service.execute(user.id)).rejects.toBeInstanceOf(ApiRequestError)
    })
  })

  describe("Data treatment", () => {
    it("must not return user password", async () => {
      const userProfile = await service.execute(user.id)

      expect(userProfile).not.toHaveProperty("password")
    })
  })
})
