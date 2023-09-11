import { Types } from "mongoose"
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

  async create(payload: Omit<Comment, 'id' | 'replies'>): Promise<Comment> {
    let comment = this.repository.create(payload)

    await this.repository.save(comment)

    return comment
  }

  async getByPostId(post_id: string): Promise<Comment[]> {
    const comments = await this.repository.find({
      where: {
        post_id
      },
      select: {
        user: {
          id: true,
          username: true,
          photo_filename: true,
        },
        post: false,
        comment: true
      }
    })

    return comments
  }

  async findById(comment_id: string): Promise<Comment | undefined> {
    try {
      const foundPost = await this.repository.findOne({
        where: {
          _id: new Types.ObjectId(comment_id.toString())
        }
      })
      return foundPost ?? undefined
    } catch (error) {
      return undefined

    }
  }
}
