import { injectable } from "tsyringe";
import { MongoRepository } from "typeorm";

import { dataSource } from "../datasource";
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
}
