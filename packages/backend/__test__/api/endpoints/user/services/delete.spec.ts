import { createUser } from "../../../../utils/create-user"
import { UserRepository } from "@infrastructures/repositories/user"
import { DeleteUserService } from "@api/endpoints/user/services/delete"
import { MockClass, createMockFromClass } from "../../../../utils/create-mock-from-class"
import { TypeormUserRepository } from "@infrastructures/typeorm/repositories/user"
import { ApiRequestError } from "@infrastructures/error-handling/api-request-error"

let service: DeleteUserService
let repository: MockClass<UserRepository>

describe("SERVICE - DeleteUser", () => {
  const USER = createUser()

  beforeEach(() => {
    repository = createMockFromClass(TypeormUserRepository as any)
    service = new DeleteUserService(repository)
  })

  describe("Successful cases", () => {
    beforeEach(() => {
      repository.findById.mockReturnValue(USER)
    })

    it("Must delete an user", async () => {
      await service.execute(USER.id)

      expect(repository.deleteById).toHaveBeenCalledWith(USER.id)
    })
  })

  describe("Error cases", () => {
    it("Must not delete a non existent user", async () => {
      repository.findById.mockReturnValue(undefined)

      await expect(service.execute('non-existent-user')).rejects.toBeInstanceOf(ApiRequestError)
    })
  })
})
