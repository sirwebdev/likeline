import { MongoRepository } from "typeorm";

import { dataSource } from "../datasource";
import { Comment } from "@domains/entities/comment";
import { CommentEntity } from "../entities/mongo/comment";
import { CommentRepository } from "@infrastructures/repositories/comment";
import { ReplyCommentMethodDTO } from "@api/endpoints/comment/dtos/reply-comment-method";
import { randomUUID } from "crypto";

export class TypeormCommentRepository implements CommentRepository {
  private readonly repository: MongoRepository<CommentEntity>

  constructor() {
    this.repository = dataSource.mongo.getMongoRepository(CommentEntity)
  }

  async create(payload: Omit<Comment, 'id' | 'replies'>): Promise<Comment> {
    let comment = this.repository.create({
      ...payload,
      replies: []
    })

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

  async reply({ user, comment, comment_id }: ReplyCommentMethodDTO): Promise<Comment> {
    const foundComment = await this.findById(comment_id);

    foundComment!.replies.push({
      id: randomUUID(),
      user,
      comment,
    })

    await this.repository.save(foundComment!)

    return foundComment!
  }

  async findById(comment_id: any): Promise<Comment | undefined> {
    const foundPost = await this.repository.findOne({
      where: {
        id: comment_id.id
      }
    })

    return foundPost ?? undefined
  }
}
