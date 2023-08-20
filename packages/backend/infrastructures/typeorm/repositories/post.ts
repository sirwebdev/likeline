import { injectable } from "tsyringe";
import { In, Repository } from "typeorm";

import { dataSource } from "../datasource";
import { PostEntity } from "../entities/postgres/post";

import { Post } from "@domains/entities/post";
import { CreatePostDTO } from "@infrastructures/dtos/create-post";
import { PostRepository } from "@infrastructures/repositories/post";

@injectable()
export class TypeormPostRepository implements PostRepository {
  private repository: Repository<PostEntity>

  constructor() {
    this.repository = dataSource.postgres.getRepository(PostEntity)
  }

  async create(payload: CreatePostDTO): Promise<Post> {
    const createdPost = this.repository.create(payload);

    await this.repository.save(createdPost)

    return createdPost
  }

  async updatePhotoFromAllPostFromUserID(userID: string, filename: string): Promise<void> {
    const posts = await this.repository.find({
      where: {
        owner_id: userID
      }
    })

    const postsToUpdate = posts.map(post => {
      post.image = filename

      return this.repository.save(post)
    })

    await Promise.all(postsToUpdate)
  }

  async getFeedPosts(user_ids: string[]): Promise<Post[]> {
    const foundPosts = await this.repository.find({
      where: {
        owner_id: In(user_ids)
      },
      order: {
        created_at: 'desc'
      },
      relations: {
        owner: true
      },
      select: {
        owner: {
          username: true,
          photo_filename: true
        }
      }
    })

    return foundPosts
  }
}
