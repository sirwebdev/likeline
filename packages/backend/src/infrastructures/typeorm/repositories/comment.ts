import { MongoRepository } from "typeorm";

import { dataSource } from "../datasource";
import { Comment } from "@domains/entities/comment";
import { CommentEntity } from "../entities/mongo/comment";
import { CommentRepository } from "@infrastructures/repositories/comment";

export class TypeormCommentRepository implements CommentRepository {
  private readonly repository: MongoRepository<CommentEntity>

  constructor() {
    this.repository = dataSource.mongo.getMongoRepository(CommentEntity)
  }

  async create(payload: Omit<Comment, 'id'>): Promise<Comment> {
    let comment = this.repository.create(payload)

    await this.repository.save(comment)

    return comment
  }

  async getByPostId(post_id: string): Promise<Comment[]> {
    const comments = await this.repository.find({
      where: {
        "post.id": post_id
      },
      select: {
        user: {
          id: true,
          username: true,
          photo_filename: true,
        },
        comment: true
      }
    })

    return comments
  }
}
