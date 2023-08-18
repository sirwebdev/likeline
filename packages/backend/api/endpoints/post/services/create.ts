import { inject, injectable } from "tsyringe";

import { Service } from "@api/dtos/service";
import { Post } from "@domains/entities/post";
import { FileService } from "@domains/interfaces/file-service";
import { CreatePostDTO } from "@api/endpoints/post/dtos/create";
import { UserRepository } from "@infrastructures/repositories/user";
import { PostRepository } from "@infrastructures/repositories/post";
import { ApiRequestError } from "@infrastructures/error-handling/api-request-error";
import { FILE_SERVICE_CONTAINER, POST_REPOSITORY_CONTAINER, USER_REPOSITORY_CONTAINER } from "@infrastructures/constants/containers";

@injectable()
export class CreatePostService implements Service<CreatePostDTO, Post> {
  constructor(
    @inject(POST_REPOSITORY_CONTAINER)
    private readonly postRepository: PostRepository,
    @inject(USER_REPOSITORY_CONTAINER)
    private readonly userRepository: UserRepository,
    @inject(FILE_SERVICE_CONTAINER)
    private readonly fileService: FileService
  ) { }

  private extractFileExtension(filename: string) {
    const splitedFileByPoint = filename.split('.')

    const fileExtension = splitedFileByPoint[splitedFileByPoint.length - 1]

    return fileExtension
  }

  async execute({ title, image, owner }: CreatePostDTO): Promise<Post> {
    const foundUser = await this.userRepository.findById(owner)

    if (!foundUser) throw new ApiRequestError('User not exists', 404)

    const { originalname } = image

    const fileExtension = this.extractFileExtension(originalname)
    const filename = `${owner}_post.${fileExtension}`

    await this.fileService.saveFile(originalname, filename)

    const post = await this.postRepository.create({
      title,
      owner_id: owner,
      image: filename
    });

    return post;
  }
}
