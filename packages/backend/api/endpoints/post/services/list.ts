import { inject, injectable } from "tsyringe";

import { Service } from "@api/dtos/service";
import { Post } from "@domains/entities/post";
import { User } from "@domains/entities/user";
import { UserRepository } from "@infrastructures/repositories/user";
import { PostRepository } from "@infrastructures/repositories/post";
import { LikeRepository } from "@infrastructures/repositories/like";
import { FollowRepository } from "@infrastructures/repositories/follow";
import { CommentRepository } from "@infrastructures/repositories/comment";
import { ApiRequestError } from "@infrastructures/error-handling/api-request-error";
import { COMMENT_REPOSITORY_CONTAINER, FOLLOW_REPOSITORY_CONTAINER, LIKE_REPOSITORY_CONTAINER, POST_REPOSITORY_CONTAINER, USER_REPOSITORY_CONTAINER } from "@infrastructures/constants/containers";

@injectable()
export class ListPostsService implements Service<User['id'], Post[]> {
  constructor(
    @inject(USER_REPOSITORY_CONTAINER)
    private readonly userRepository: UserRepository,
    @inject(POST_REPOSITORY_CONTAINER)
    private readonly postRepository: PostRepository,
    @inject(FOLLOW_REPOSITORY_CONTAINER)
    private readonly followRepository: FollowRepository,
    @inject(LIKE_REPOSITORY_CONTAINER)
    private readonly likeRepository: LikeRepository,
    @inject(COMMENT_REPOSITORY_CONTAINER)
    private readonly commentRepository: CommentRepository
  ) { }

  async execute(user_id: string): Promise<Post[]> {
    const foundUser = await this.userRepository.findById(user_id)
    if (!foundUser) throw new ApiRequestError('User not found', 404)

    const followers = await this.followRepository.getFollowings(foundUser.id)

    const follower_ids = followers.map((follow => follow.following_id))

    const posts = await this.postRepository.getFeedPosts([...follower_ids, foundUser.id])

    const likesForEachPostPromises = posts.map(post => this.likeRepository.getLikes(post.id))
    const likeForEachPosts = await Promise.all(likesForEachPostPromises)

    const commentPromises = posts.map(post => this.commentRepository.getByPostId(post.id))

    const comments = await Promise.all(commentPromises)

    const postsWithLikes = posts.map((post, index) => ({
      ...post,
      likes: likeForEachPosts[index],
      comments: comments[index]
    }));

    return postsWithLikes;
  }
}
