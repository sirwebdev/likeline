import { inject, injectable } from "tsyringe";

import { Service } from "../dtos/service";
import { USER_REPOSITORY_CONTAINER } from "@infrastructures/constants/containers";
import { UserRepository } from "@infrastructures/repositories/user";
import { IdType } from "@infrastructures/typeorm/entities/user";
import { ApiRequestError } from "@infrastructures/error-handling/api-request-error";

@injectable()
export class DeleteUserService implements Service<IdType, void> {
  constructor(
    @inject(USER_REPOSITORY_CONTAINER)
    private readonly userRepository: UserRepository
  ) { }

  async execute(userID: IdType): Promise<void> {
    const foundUser = await this.userRepository.findById(userID)

    if (!foundUser) throw new ApiRequestError('User not exists', 404)

    await this.userRepository.deleteById(foundUser.id)
  }

}
