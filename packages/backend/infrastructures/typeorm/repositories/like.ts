import { LikePostDTO } from "@api/endpoints/like/dtos/like-post";
import { Like } from "@domains/entities/like";
import { LikeRepository } from "@infrastructures/repositories/like";
import { injectable } from "tsyringe";
import { Repository } from "typeorm";
import { LikeEntity } from "../entities/postgres/like";
import { dataSource } from "../datasource";

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
}
