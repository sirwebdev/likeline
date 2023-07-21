import { CreateUserDTO } from "../dtos/create-user";

export class CreateUserService {
  static async execute(payload: CreateUserDTO) {
    console.log({ payload })

  }
}
