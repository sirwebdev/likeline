import { injectable } from "tsyringe";
import { Repository } from "typeorm";

import { dataSource } from "../datasource";
import { UserEntity } from "../entities/postgres/user";

import { User } from "@domains/entities/user";
import { UserRepository } from "@infrastructures/repositories/user";
import { CreateUserDTO } from "@api/endpoints/user/dtos/create-user";

@injectable()
export class TypeormUserRepository implements UserRepository {
  private repository: Repository<UserEntity>

  constructor() {
    this.repository = dataSource.postgres.getRepository(UserEntity)
  }

  async create(payload: Omit<CreateUserDTO, 'confirmPassword'>): Promise<User> {
    const createdUser = this.repository.create(payload);

    await this.repository.save(createdUser)

    return createdUser
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const foundUserByEmail = await this.repository.findOneBy({
      email
    })

    return foundUserByEmail ?? undefined
  }

  async findById(id: string): Promise<User | undefined> {
    const foundUserById = await this.repository.findOneBy({
      id
    })

    return foundUserById ?? undefined
  }

  async findByUsername(username: string): Promise<User | undefined> {
    const foundUserByUsername = await this.repository.findOneBy({
      username
    })

    return foundUserByUsername ?? undefined
  }

  async deleteById(objectId: string): Promise<void> {
    await this.repository.delete(objectId)
  }

  async update(userID: string, payload: Partial<User>): Promise<User> {
    await this.repository.update(userID, payload)

    const updatedUser = await this.findById(userID)

    return updatedUser!
  }
}
