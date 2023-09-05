import { Repository } from "typeorm";

import { dataSource } from "../datasource";
import { Comment } from "@domains/entities/comment";
import { CommentEntity } from "../entities/postgres/comment";
import { CommentPostDTO } from "@api/endpoints/comment/dtos/post";
import { CommentRepository } from "@infrastructures/repositories/comment";

export class TypeormCommentRepository implements CommentRepository {
  private readonly repository: Repository<CommentEntity>

  constructor() {
    this.repository = dataSource.postgres.getRepository(CommentEntity)
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

  async getByPostId(post_id: string): Promise<Comment[]> {
    const comments = await this.repository.find({
      where: {
        post_id
      },
      relations: {
        user: true
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
