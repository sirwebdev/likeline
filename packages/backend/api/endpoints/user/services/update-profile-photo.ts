import { inject, injectable } from "tsyringe";

import { Service } from "@api/dtos/service";
import { ProfileDTO } from "../dtos/profile";
import { FileService } from "@domains/interfaces/file-service";
import { UserRepository } from "@infrastructures/repositories/user";
import { UpdateProfilePhotoDTO } from "../dtos/update-profile-photo";
import { ApiRequestError } from "@infrastructures/error-handling/api-request-error";
import { FILE_SERVICE_CONTAINER, FOLLOW_REPOSITORY_CONTAINER, USER_REPOSITORY_CONTAINER } from "@infrastructures/constants/containers";
import { FollowRepository } from "@infrastructures/repositories/follow";

@injectable()
export class UpdateProfilePhotoService implements Service<UpdateProfilePhotoDTO, ProfileDTO>{
  constructor(
    @inject(USER_REPOSITORY_CONTAINER)
    private readonly userRepository: UserRepository,
    @inject(FILE_SERVICE_CONTAINER)
    private readonly fileService: FileService,
    @inject(FOLLOW_REPOSITORY_CONTAINER)
    private readonly followRepository: FollowRepository
  ) { }

  private extractFileExtension(filename: string) {
    const splitedFileByPoint = filename.split('.')

    const fileExtension = splitedFileByPoint[splitedFileByPoint.length - 1]

    return fileExtension
  }

  async execute({ userID, tempFilename }: UpdateProfilePhotoDTO): Promise<ProfileDTO> {
    const foundUser = await this.userRepository.findById(userID)

    if (!foundUser) throw new ApiRequestError('User not exists', 404)

    const fileName = `${foundUser.id}_profile.${this.extractFileExtension(tempFilename)}`

    if (foundUser.photo_filename) {
      await this.fileService.deleteFile(foundUser.photo_filename)
    }

    await this.fileService.saveFile(tempFilename, fileName)

    const updateUser = await this.userRepository.update(userID, { photo_filename: fileName })

    const { password: _password, ...user } = updateUser

    await this.followRepository.updatePhotoFromAllFollowOfUserID(updateUser.id, fileName)

    const followers = await this.followRepository.getFollowers(user.id)
    const followees = await this.followRepository.getFollowees(user.id)

    return {
      ...user,
      followees,
      followers
    }
  }
}
