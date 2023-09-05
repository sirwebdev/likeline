import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "tsyringe";

import { Service } from "@api/dtos/service";
import { Post } from "@domains/entities/post";
import { CreatePostDTO } from "@api/endpoints/post/dtos/create";
import { ResolveController } from "@infrastructures/decorators/resolve-controller";
import { CREATE_POST_SERVICE_CONTAINER } from "@infrastructures/constants/containers";

@injectable()
export class CreatePostController {
  constructor(
    @inject(CREATE_POST_SERVICE_CONTAINER)
    private readonly service: Service<CreatePostDTO, Post>
  ) { }

  @ResolveController(CreatePostController)
  async execute(req: Request, res: Response, next: NextFunction) {
    const { title }: CreatePostDTO = req.body;
    const image = req.file!;
    const { id } = req.user

    const post = await this.service.execute({
      owner: id,
      title,
      image
    });

    res.status(201)
    res.locals.post = post

    next()
  }
}
