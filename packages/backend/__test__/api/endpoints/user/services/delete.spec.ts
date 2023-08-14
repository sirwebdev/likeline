import { createUser } from "../../../../utils/create-user"
import { UserRepository } from "@infrastructures/repositories/user"
import { DeleteUserService } from "@api/endpoints/user/services/delete"
import { MockClass, createMockFromClass } from "../../../../utils/create-mock-from-class"
import { TypeormUserRepository } from "@infrastructures/typeorm/repositories/user"
import { ApiRequestError } from "@infrastructures/error-handling/api-request-error"
import { FileService } from "@domains/interfaces/file-service"
import { FSFileService } from "@domains/services/file/fs-service"

let service: DeleteUserService
let fileService: MockClass<FileService>
let repository: MockClass<UserRepository>

describe("SERVICE - DeleteUser", () => {
  const USER = createUser()

  beforeEach(() => {
    fileService = createMockFromClass(FSFileService as any)
    repository = createMockFromClass(TypeormUserRepository as any)

    service = new DeleteUserService(repository, fileService)
  })

  describe("Successful cases", () => {
    const FILENAME = 'filename.txt'

    beforeEach(() => {
      repository.findById.mockReturnValue(USER)
    })

    it("Must delete an user", async () => {
      await service.execute(USER.id)

      expect(repository.deleteById).toHaveBeenCalledWith(USER.id)
    })

    it("Must delete the existent user profile photo", async () => {
      repository.findById.mockReturnValueOnce({ ...USER, photo_filename: FILENAME })

      await service.execute(USER.id)

      expect(fileService.deleteFile).toHaveBeenCalledWith(FILENAME)
    })
  })

  describe("Error cases", () => {
    it("Must not delete a non existent user", async () => {
      repository.findById.mockReturnValue(undefined)

      await expect(service.execute('non-existent-user')).rejects.toBeInstanceOf(ApiRequestError)
    })
  })
})
