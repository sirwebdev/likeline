import { Types } from "mongoose";
import { injectable } from "tsyringe";
import { MongoRepository } from "typeorm";

import { dataSource } from "../datasource";
import { User } from "@domains/entities/user";
import { Reply } from "@domains/entities/reply";
import { ReplyEntity } from "../entities/mongo/reply";
import { ReplyRepository } from "@infrastructures/repositories/reply";
import { ReplyCommentMethodDTO } from "@api/endpoints/reply/dtos/reply-comment-method";

@injectable()
export class TypeormReplyRepository implements ReplyRepository {
  private readonly repository: MongoRepository<ReplyEntity>

  constructor() {
    this.repository = dataSource.mongo.getMongoRepository(ReplyEntity)
  }

  async reply({ user, comment, comment_id }: ReplyCommentMethodDTO): Promise<Reply> {
    const reply = this.repository.create({
      user,
      comment,
      comment_id
    })

    await this.repository.save(reply)

    return reply
  }

  async getRepliesByCommentId(comment_id: string): Promise<Reply[]> {
    const replies = await this.repository.find({
      where: {
        comment_id: String(comment_id)
      }
    })

    return replies
  }

  async deleteAllByUserId(user_id: User['id']): Promise<void> {
    const replies = await this.repository.find(({
      where: {
        "user.id": user_id
      }
    }))

    const repliesToDeletePromises = replies.map(comment => this.repository.deleteOne({
      _id: new Types.ObjectId(comment.id.toString())
    }))
    await Promise.all(repliesToDeletePromises)
  }

  async deleteAllByCommentId(comment_id: string): Promise<void> {
    await this.repository.delete({
      comment_id: comment_id.toString()
    })
  }

  async updatePhotoFromAllRepliesByUserID(user_id: User['id'], filename: User['photo_filename']): Promise<void> {
    const foundReplies = await this.repository.find({
      where: {
        'user.id': user_id
      }
    })

    const repliesToUpdateUserFilename = foundReplies.map(reply => this.repository.update({
      id: reply.id
    }, {
      user: {
        photo_filename: filename
      }
    }))

    await Promise.all(repliesToUpdateUserFilename)
  }
}
