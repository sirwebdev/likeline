import { MongoRepository } from "typeorm";

import { dataSource } from "../datasource";
import { Comment } from "@domains/entities/comment";
import { MongoCommentEntity } from "../entities/mongo/comment";
import { CommentPostDTO } from "@api/endpoints/comment/dtos/post";
import { CommentRepository } from "@infrastructures/repositories/comment";

export class MongoCommentRepository implements CommentRepository {
  private readonly repository: MongoRepository<MongoCommentEntity>

  constructor() {
    this.repository = dataSource.mongo.getMongoRepository(MongoCommentEntity)
  }

  async create({ comment, post_id, user_id }: CommentPostDTO): Promise<Comment> {
    const post = this.repository.create({
      comment,
      post_id,
      user_id
    })

    await this.repository.save(post)

    return post
  }
}
