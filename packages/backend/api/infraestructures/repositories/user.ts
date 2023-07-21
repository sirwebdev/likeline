import { User } from "../../../domains/user";
import { CreateUserDTO } from "../../endpoints/user/dtos/create-user";

export class UserRepository {
  create: (payload: CreateUserDTO) => Promise<User>
}
