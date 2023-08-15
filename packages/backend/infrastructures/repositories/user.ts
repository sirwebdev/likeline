import { User } from "@domains/entities/user";
import { CreateUserDTO } from "@api/endpoints/user/dtos/create-user";

export class UserRepository {
  deleteById: (id: string) => Promise<void>
  findById: (id: string) => Promise<User | undefined>
  findByEmail: (email: string) => Promise<User | undefined>
  findByUsername: (username: string) => Promise<User | undefined>
  update: (userid: string, payload: Partial<User>) => Promise<User>
  create: (payload: Omit<CreateUserDTO, 'confirmPassword'>) => Promise<User>
}
