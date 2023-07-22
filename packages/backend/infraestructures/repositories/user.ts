import { User } from "@domains/user";
import { CreateUserDTO } from "@api/endpoints/user/dtos/create-user";

export class UserRepository {
  create: (payload: CreateUserDTO) => Promise<User>
}
