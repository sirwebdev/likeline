import { injectable } from "tsyringe";
import { Repository } from "typeorm";

import { dataSource } from "../datasource";
import { PostEntity } from "../entities/post";

import { Post } from "@domains/entities/post";
import { CreatePostDTO } from "@infrastructures/dtos/create-post";
import { PostRepository } from "@infrastructures/repositories/post";

@injectable()
export class TypeormPostRepository implements PostRepository {
  private repository: Repository<PostEntity>

  constructor() {
    this.repository = dataSource.getRepository(PostEntity)
  }

  async create(payload: CreatePostDTO): Promise<Post> {
    const createdPost = this.repository.create(payload);

    await this.repository.save(createdPost)

    return createdPost
  }
}
