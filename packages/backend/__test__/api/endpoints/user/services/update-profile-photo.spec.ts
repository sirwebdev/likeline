import { createUser } from "../../../../utils/create-user"
import { FileService } from "@domains/interfaces/file-service"
import { FSFileService } from "@domains/services/file/fs-service"
import { UserRepository } from "@infrastructures/repositories/user"
import { TypeormUserRepository } from "@infrastructures/typeorm/repositories/user"
import { ApiRequestError } from "@infrastructures/error-handling/api-request-error"
import { MockClass, createMockFromClass } from "../../../../utils/create-mock-from-class"
import { UpdateProfilePhotoService } from "@api/endpoints/user/services/update-profile-photo"

let service: UpdateProfilePhotoService
let fileService: MockClass<FileService>
let repository: MockClass<UserRepository>

describe("SERVICE - UpdateProfilePhoto", () => {
  const USER = createUser()
  const TEMP_FILE_NAME = 'FILENAME.ext'

  beforeEach(() => {
    fileService = createMockFromClass(FSFileService as any)
    repository = createMockFromClass(TypeormUserRepository as any)

    service = new UpdateProfilePhotoService(repository, fileService)
  })

  describe("Successful cases", () => {

    beforeEach(() => {
      repository.findById.mockReturnValue(USER)
      repository.update.mockReturnValue(USER)
    })

    it("Must save file when user when user exists", async () => {
      await service.execute({ userID: USER.id, tempFilename: TEMP_FILE_NAME })

      expect(fileService.deleteFile).not.toHaveBeenCalled()
      expect(fileService.saveFile).toHaveBeenCalledWith(TEMP_FILE_NAME, `${USER.id}_profile.ext`)
    })

    it("Must update user photo_file", async () => {
      await service.execute({ userID: USER.id, tempFilename: TEMP_FILE_NAME })

      expect(repository.update).toHaveBeenCalledWith(USER.id, { photo_filename: `${USER.id}_profile.ext` })
    })

    it("Must delete existent user photo when user already have profile photo", async () => {
      const PHOTO_FILENAME = 'existent_user_profile_photo.jpg'
      repository.findById.mockReturnValueOnce({ ...USER, photo_filename: PHOTO_FILENAME })

      await service.execute({ userID: USER.id, tempFilename: TEMP_FILE_NAME })

      expect(fileService.deleteFile).toHaveBeenCalledWith(PHOTO_FILENAME)
    })
  })

  describe("Error cases", () => {
    beforeEach(() => {
      repository.findById.mockReturnValue(undefined)
    })

    it("Must not update user profile when user not exists", async () => {
      await expect(service.execute({ userID: USER.id, tempFilename: TEMP_FILE_NAME })).rejects.toBeInstanceOf(ApiRequestError)
    })
  })
})
