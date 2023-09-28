import { Types } from "mongoose"
import { MongoRepository } from "typeorm";

import { dataSource } from "../datasource";
import { Comment } from "@domains/entities/comment";
import { CommentEntity } from "../entities/mongo/comment";
import { CommentRepository } from "@infrastructures/repositories/comment";
import { User } from "@domains/entities/user";

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
      const foundComment = await this.repository.findOne({
        where: {
          _id: new Types.ObjectId(comment_id.toString())
        }
      })
      return foundComment ?? undefined
    } catch (error) {
      return undefined

    }
  }

  async deleteAllByUserId(user_id: User['id']): Promise<void> {
    const comments = await this.repository.find(({
      where: {
        "user.id": user_id
      }
    }))

    const commentsToDeletePromises = comments.map(comment => this.repository.deleteOne({
      _id: new Types.ObjectId(comment.id.toString())
    }))
    await Promise.all(commentsToDeletePromises)
  }

  async deleteAllByPostId(post_id: string): Promise<void> {
    await this.repository.delete({
      post_id
    })
  }

  async updatePhotoFromAllCommentsByUserID(user_id: User['id'], filename: User['photo_filename']): Promise<void> {
    const foundComments = await this.repository.find({
      where: {
        'user.id': user_id
      }
    })

    const commentsToUpdateUserFilename = foundComments.map(comment => this.repository.update({
      id: comment.id
    }, {
      user: {
        photo_filename: filename
      }
    }))

    await Promise.all(commentsToUpdateUserFilename)
  }
}
