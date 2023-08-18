import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { Service } from "@api/dtos/service";
import { CreatePostDTO } from "@api/endpoints/post/dtos/create";
import { Post } from "@domains/entities/post";
import { CREATE_POST_SERVICE_CONTAINER } from "@infrastructures/constants/containers";
import { ResolveController } from "@infrastructures/decorators/resolve-controller";

@injectable()
export class CreatePostController {
  constructor(
    @inject(CREATE_POST_SERVICE_CONTAINER)
    private readonly service: Service<CreatePostDTO, Post>
  ) { }

  @ResolveController(CreatePostController)
  async execute(req: Request, res: Response) {
    const { title }: CreatePostDTO = req.body;
    const image = req.file!;
    const { id } = req.user

    const post = await this.service.execute({
      owner: id,
      title,
      image
    });

    return res.status(201).json(post);
  }
}
