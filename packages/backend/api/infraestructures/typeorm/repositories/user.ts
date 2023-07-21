import { injectable } from "tsyringe";
import { MongoRepository } from "typeorm";

import { dataSource } from "../datasource";
import { UserEntity } from "../entities/user";
import { User } from "../../../../domains/user";
import { UserRepository } from "../../repositories/user";
import { CreateUserDTO } from "../../../endpoints/user/dtos/create-user";

@injectable()
export class TypeormUserRepository implements UserRepository {
  private repository: MongoRepository<UserEntity>

  constructor() {
    this.repository = dataSource.getMongoRepository(UserEntity)
  }

  async create(payload: CreateUserDTO): Promise<User> {
    const createdUser = this.repository.create(payload);

    await this.repository.save(createdUser)

    return createdUser
  }
}
