import { inject, injectable } from "tsyringe";

import { Service } from "@api/endpoints/user/dtos/service";
import { AuthenticationDTO } from "../dtos/authentication";
import { TokenService } from "@domains/interfaces/token-service";
import { UserRepository } from "@infrastructures/repositories/user";
import { EncryptionService } from "@domains/interfaces/encription-service";
import { ENCRYPTION_SERVICE_CONTAINER, TOKEN_SERVICE_CONTAINER, USER_REPOSITORY_CONTAINER } from "@infrastructures/constants/containers";
import { ApiRequestError } from "@infrastructures/error-handling/api-request-error";

@injectable()
export class AuthenticateService implements Service<AuthenticationDTO, string> {
  constructor(
    @inject(USER_REPOSITORY_CONTAINER)
    private readonly userRepository: UserRepository,
    @inject(ENCRYPTION_SERVICE_CONTAINER)
    private readonly encryptionService: EncryptionService,
    @inject(TOKEN_SERVICE_CONTAINER)
    private readonly tokenService: TokenService
  ) { }

  async execute({ email, password }: AuthenticationDTO): Promise<string> {
    const foundUser = await this.userRepository.findByEmail(email)
    if (!foundUser) throw new ApiRequestError('Invalid email or password.', 401)

    const isCorrectPassword = await this.encryptionService.comparePasswords(password, foundUser.password)
    if (!isCorrectPassword) throw new ApiRequestError('Invalid email or password.', 401)

    const token = this.tokenService.createToken({ id: foundUser.id}, '1d')

    return token
  }
}
