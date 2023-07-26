import { User } from "@domains/entities/user";
import { CreateUserDTO } from "@api/endpoints/user/dtos/create-user";

export class UserRepository {
  create: (payload: Omit<CreateUserDTO, 'confirmPassword'>) => Promise<User>
  findByEmail: (email: string) => Promise<User | undefined>
  findByUsername: (username: string) => Promise<User | undefined>
}
