import { Repository } from "typeorm";
import { injectable } from "tsyringe";

import { dataSource } from "../datasource";
import { Like } from "@domains/entities/like";
import { LikeEntity } from "../entities/postgres/like";
import { LikePostDTO } from "@api/endpoints/like/dtos/like-post";
import { LikeRepository } from "@infrastructures/repositories/like";

@injectable()
export class TypeormLikeRepository implements LikeRepository {
  private repository: Repository<LikeEntity>

  constructor() {
    this.repository = dataSource.postgres.getRepository(LikeEntity)
  }

  async create({ user_id, post_id }: LikePostDTO): Promise<Like> {
    const like = this.repository.create({
      post_id,
      user_id,
    })

    await this.repository.save(like)

    return like
  }

  async isLiked({ post_id, user_id }: LikePostDTO): Promise<boolean> {
    const foundLike = await this.repository.findOne({
      where: {
        user_id,
        post_id
      }
    })

    return !!foundLike
  }

  async getLikes(post_id: string): Promise<Like[]> {
    const likes = await this.repository.find({
      where: {
        post_id
      },
      relations: {
        user: true
      },
      select: {
        id: true,
        created_at: true,
        user: {
          username: true,
          photo_filename: true
        }
      }
    })

    return likes
  }
}
