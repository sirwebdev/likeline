import { injectable } from "tsyringe";
import { MongoRepository } from "typeorm";

import { dataSource } from "../datasource";

import { Follow } from "@domains/entities/follow";
import { FollowEntity } from "../entities/mongo/follow";
import { FollowRepository } from "@infrastructures/repositories/follow";
import { CreateFollowDTO } from "@infrastructures/dtos/create-follow";
import { DeleteFollowDTO } from "@infrastructures/dtos/delete-follow";

@injectable()
export class TypeormFollowRepository implements FollowRepository {
  private repository: MongoRepository<FollowEntity>

  constructor() {
    this.repository = dataSource.mongo.getMongoRepository(FollowEntity)
  }

  async create({ followee_id, follower_id, followee_photo, follower_photo, followee_username, follower_username }: CreateFollowDTO): Promise<Follow> {
    const createdFollow = this.repository.create({
      follower_id: follower_id,
      following_id: followee_id,
      followed_date: new Date(),
      follower_photo,
      follower_username,
      following_photo: followee_photo,
      following_username: followee_username
    });

    await this.repository.save(createdFollow)

    return createdFollow
  }

  async delete({ follower_id, followee_id }: DeleteFollowDTO): Promise<void> {
    await this.repository.delete({
      following_id: followee_id,
      follower_id
    })
  }

  async deleteAllByUserId(follower_id: string): Promise<void> {
    await this.repository.deleteMany(
      {
        $or: [
          { following_id: follower_id },
          { follower_id: follower_id }
        ]

      }
    )
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

  async getFollowings(follower_id: string): Promise<Follow[]> {
    const followees = await this.repository.find({
      where: {
        follower_id
      }
    })

    return followees
  }

  async getFollowers(follower_id: string): Promise<Follow[]> {
    const followers = await this.repository.find({
      where: {
        following_id: follower_id
      }
    })

    return followers
  }

  async updatePhotoFromAllFollowOfUserID(user_id: string, filename: string): Promise<void> {
    const follows = await this.repository.find({
      where: {
        $or: [
          { following_id: user_id },
          { follower_id: user_id }
        ]
      }
    });

    const followsToUpdate = follows.map(async follow => {
      if (follow.follower_id === user_id) {
        follow.follower_photo = filename;
      }

      if (follow.following_id === user_id) {
        follow.following_photo = filename;
      }

      return this.repository.save(follow);
    })

    await Promise.all(followsToUpdate);
  }
}
