import { CreateUserDTO } from "@api/api/endpoints/user/dtos/create-user";
import { User } from "@api/domains/user";

export class UserRepository {
  create: (payload: CreateUserDTO) => Promise<User>
}
