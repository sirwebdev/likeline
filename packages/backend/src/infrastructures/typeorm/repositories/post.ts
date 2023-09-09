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
        owner: true,
        likes: true,
      },
      select: {
        owner: {
          username: true,
          photo_filename: true
        },
      }
    })

    return foundPosts
  }

  async findById(post_id: string): Promise<Post | undefined> {
    const foundPost = await this.repository.findOne({
      where: {
        id: post_id
      },
    })

    return foundPost ?? undefined
  }

  async delete(post_id: string): Promise<void> {
    await this.repository.delete(post_id)
  }

  async getPostsByUserID(user_id: string): Promise<Post[]> {
    const posts = await this.repository.find({
      where: {
        owner_id: user_id
      }
    })

    return posts
  }
}
