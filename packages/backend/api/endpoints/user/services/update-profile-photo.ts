import { inject, injectable } from "tsyringe";

import { Service } from "../dtos/service";
import { User } from "@domains/entities/user";
import { FileService } from "@domains/interfaces/file-service";
import { UserRepository } from "@infrastructures/repositories/user";
import { UpdateProfilePhotoDTO } from "../dtos/update-profile-photo";
import { ApiRequestError } from "@infrastructures/error-handling/api-request-error";
import { FILE_SERVICE_CONTAINER, USER_REPOSITORY_CONTAINER } from "@infrastructures/constants/containers";

@injectable()
export class UpdateProfilePhotoService implements Service<UpdateProfilePhotoDTO, User>{
  constructor(
    @inject(USER_REPOSITORY_CONTAINER)
    private readonly userRepository: UserRepository,
    @inject(FILE_SERVICE_CONTAINER)
    private readonly fileService: FileService
  ) { }

  private extractFileExtension(filename: string) {
    const splitedFileByPoint = filename.split('.')

    const fileExtension = splitedFileByPoint[splitedFileByPoint.length - 1]

    return fileExtension
  }

  async execute({ userID, tempFilename }: UpdateProfilePhotoDTO): Promise<User> {
    const foundUser = await this.userRepository.findById(userID)

    if (!foundUser) throw new ApiRequestError('User not exists', 404)

    const fileName = `${foundUser.id}_profile.${this.extractFileExtension(tempFilename)}`

    if (foundUser.photo_filename) {
      await this.fileService.deleteFile(foundUser.photo_filename)
    }

    await this.fileService.saveFile(tempFilename, fileName)

    const updateUser = await this.userRepository.update(foundUser.id, { photo_filename: fileName })

    return updateUser
  }
}
