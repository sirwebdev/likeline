import { UserRepository } from "@infraestructures/repositories/user"
import { CreateUserDTO } from "@api/endpoints/user/dtos/create-user"
import { CreateUserService } from "@api/endpoints/user/services/create"
import { TypeormUserRepository } from "@infraestructures/typeorm/repositories/user"
import { MockClass, createMockFromClass } from "../../../../utils/create-mock-from-class"
import { EncryptionService } from "@domains/interfaces/encription-service"
import BcryptService from "@domains/services/encryption/bcrypt-service.ts"

let service: CreateUserService
let repository: MockClass<UserRepository>
let encryptionService: MockClass<EncryptionService>

describe("SERVICE - CreateUser", () => {
  let userPayload: CreateUserDTO;

  beforeEach(() => {
    repository = createMockFromClass(TypeormUserRepository as any)
    encryptionService = createMockFromClass(BcryptService as any)
    service = new CreateUserService(repository, encryptionService)
    userPayload = { name: 'John Doe', username: 'me_doe', email: 'doe@email.com', password: '123', confirmPassword: '123' }
  })

  describe("Successful cases", () => {
    const ENCRYPTED_PASSWORD = 'ENCRYPTED_PASSWORD'
    it("Must create a new user if it does not exist", async () => {
      encryptionService.hashPassword.mockReturnValue(ENCRYPTED_PASSWORD)
      const { confirmPassword, ...payload } = userPayload;
      await service.execute(userPayload)
      expect(repository.create).toHaveBeenCalledWith({
        ...payload,
        password: ENCRYPTED_PASSWORD
      })
    })
  })

  describe("Error cases", () => {
    it("Must not create a new user if the email already exists", async () => {
      repository.findByEmail.mockResolvedValue(userPayload);
      await expect(service.execute(userPayload)).rejects.toThrowError('User already exists with this email');
      expect(repository.create).not.toHaveBeenCalled()
    })

    it("Must not create a new user if the username already exists", async () => {
      repository.findByUsername.mockResolvedValue(userPayload);
      await expect(service.execute(userPayload)).rejects.toThrowError('User already exists with this username');
      expect(repository.create).not.toHaveBeenCalled()
    })

    it("Must not create a new user if the confirm password does not match with the password", async () => {
      const wrongPayload = { ...userPayload, confirmPassword: 'wrongPassword' };
      await expect(service.execute(wrongPayload)).rejects.toThrowError('Confirm password does not match with password');
      expect(repository.create).not.toHaveBeenCalled()
    })
  })

  describe("Data treatment", () => {
    it("Must not send confirmPassword to create method", async () => {
      await service.execute(userPayload)

      expect(repository.create).toHaveBeenCalledWith(
        expect.not.objectContaining({ confirmPassword: userPayload.confirmPassword })
      );
    })

    it("Must encrypt password before sending it to repository", async () => {
      await service.execute(userPayload)

      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({ password: expect.not.stringMatching(userPayload.password) })
      );
    })
  })
})
