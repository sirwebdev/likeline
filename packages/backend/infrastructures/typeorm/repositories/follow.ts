import { injectable } from "tsyringe";
import { MongoRepository } from "typeorm";

import { dataSource } from "../datasource";

import { Follow } from "@domains/entities/follow";
import { FollowEntity } from "../entities/mongo/follow";
import { FollowRepository } from "@infrastructures/repositories/follow";
import { CreateFollowDTO } from "@infrastructures/dtos/create-follow";

@injectable()
export class TypeormFollowRepository implements FollowRepository {
  private repository: MongoRepository<FollowEntity>

  constructor() {
    this.repository = dataSource.mongo.getMongoRepository(FollowEntity)
  }

  async create({ followee_id, follower_id }: CreateFollowDTO): Promise<Follow> {
    const createdFollow = this.repository.create({ follower_id: follower_id, following_id: followee_id, followed_date: new Date() });

    await this.repository.save(createdFollow)

    return createdFollow
  }

  async checkIsFollowing(follower_id: string, followee: string): Promise<boolean> {
    const foundFollow = await this.repository.findOne({
      where: {
        follower_id,
        following_id: followee
      }
    })

    return !!foundFollow
  }

  async getFollowees(follower_id: string): Promise<Follow[]> {
    const followees = await this.repository.find({
      where: {
        following_id: follower_id
      }
    })

    return followees
  }

  async getFollowers(follower_id: string): Promise<Follow[]> {
    const followers = await this.repository.find({
      where: {
        follower_id
      }
    })

    return followers
  }
}
