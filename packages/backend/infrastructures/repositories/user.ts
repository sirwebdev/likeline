import { User } from "@domains/entities/user";
import { IdType } from "@infrastructures/typeorm/entities/user";
import { CreateUserDTO } from "@api/endpoints/user/dtos/create-user";

export class UserRepository {
  deleteById: (id: IdType) => Promise<void>
  findById: (id: IdType) => Promise<User | undefined>
  findByEmail: (email: string) => Promise<User | undefined>
  findByUsername: (username: string) => Promise<User | undefined>
  update: (userid: IdType, payload: Partial<User>) => Promise<User>
  create: (payload: Omit<CreateUserDTO, 'confirmPassword'>) => Promise<User>
}
