import { AuthenticateService } from "@api/endpoints/auth/services/authenticate";
import { MockClass, createMockFromClass } from "../../../../utils/create-mock-from-class";
import { TypeormUserRepository } from "@infrastructures/typeorm/repositories/user";
import { BcryptService } from "@domains/services/encryption/bcrypt-service.ts";
import { UserRepository } from "@infrastructures/repositories/user";
import { EncryptionService } from "@domains/interfaces/encription-service";
import { TokenService } from "@domains/interfaces/token-service";
import { JwtService } from "@domains/services/token/jwk-service";
import { AuthenticationDTO } from "@api/endpoints/auth/dtos/authentication";
import { User } from "@domains/entities/user";
import { ApiRequestError } from "@infrastructures/error-handling/api-request-error";

let service: AuthenticateService
let repository: MockClass<UserRepository>
let encryptionService: MockClass<EncryptionService>
let tokenService: MockClass<TokenService>

describe("SERVICE - Authenticate", () => {
  let GENERATED_TOKEN = 'GENERATED_TOKEN'
  const AUTHENTICATION_PAYLOAD: AuthenticationDTO = { email: 'email@email.com', password: 'password123' }
  const USER: User = {
    id: 'user_id',
    password: '123',
    email: 'email@email.com',
    name: 'Jonh Doe',
    username: 'I_doe',
  }

  beforeEach(() => {
    repository = createMockFromClass(TypeormUserRepository as any)
    encryptionService = createMockFromClass(BcryptService as any)
    tokenService = createMockFromClass(JwtService as any)

    service = new AuthenticateService(repository, encryptionService, tokenService)

    repository.findByEmail.mockReturnValue(USER)
    encryptionService.comparePasswords.mockReturnValue(true)
    tokenService.createToken.mockReturnValue(GENERATED_TOKEN)
  })

  describe("Successful cases", () => {

    it("Must return token when user authenticate", async () => {
      const token = await service.execute(AUTHENTICATION_PAYLOAD)

      expect(token).toEqual(GENERATED_TOKEN)
    })

    it("Must call comparePasswords from encription service to validate passwords", async () => {
      await service.execute(AUTHENTICATION_PAYLOAD)

      expect(encryptionService.comparePasswords).toHaveBeenCalledWith(AUTHENTICATION_PAYLOAD.password, USER.password)
    })

    it("Must call findByEmail from repository", async () => {
      await service.execute(AUTHENTICATION_PAYLOAD)

      expect(repository.findByEmail).toHaveBeenCalledWith(AUTHENTICATION_PAYLOAD.email)
    })

    it("Must call createToken from token service with user id as payload", async () => {
      await service.execute(AUTHENTICATION_PAYLOAD)

      expect(tokenService.createToken).toHaveBeenCalledWith({ id: USER.id }, expect.any(String))
    })

    it("Must call createToken from token service with '1d' of expiration time", async () => {
      await service.execute(AUTHENTICATION_PAYLOAD)

      expect(tokenService.createToken).toHaveBeenCalledWith(expect.anything(), '1d')
    })
  })

  describe('Error cases', () => {
    it("Must not authenticate when user not exists", async () => {
      repository.findByEmail.mockReturnValue(undefined)

      await expect(service.execute({ email: 'non_existent_user_email@email.com', password: USER.password })).rejects.toBeInstanceOf(ApiRequestError)
    })

    it("Must not authenticate when user password are invalid", async () => {
      encryptionService.comparePasswords.mockReturnValue(false)

      await expect(service.execute({ email: USER.email, password: 'invalid_password' })).rejects.toBeInstanceOf(ApiRequestError)
    })
  })
})
