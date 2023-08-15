import { inject, injectable } from "tsyringe";

import { Service } from "../dtos/service";
import { FileService } from "@domains/interfaces/file-service";
import { UserRepository } from "@infrastructures/repositories/user";
import { ApiRequestError } from "@infrastructures/error-handling/api-request-error";
import { FILE_SERVICE_CONTAINER, USER_REPOSITORY_CONTAINER } from "@infrastructures/constants/containers";

@injectable()
export class DeleteUserService implements Service<string, void> {
  constructor(
    @inject(USER_REPOSITORY_CONTAINER)
    private readonly userRepository: UserRepository,
    @inject(FILE_SERVICE_CONTAINER)
    private readonly fileService: FileService
  ) { }

  async execute(userID: string): Promise<void> {
    const foundUser = await this.userRepository.findById(userID)

    if (!foundUser) throw new ApiRequestError('User not exists', 404)

    if (foundUser.photo_filename) await this.fileService.deleteFile(foundUser.photo_filename)

    await this.userRepository.deleteById(foundUser.id)
  }

}
