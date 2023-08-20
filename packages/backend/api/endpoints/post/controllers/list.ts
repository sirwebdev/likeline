import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { Service } from "@api/dtos/service";
import { Post } from "@domains/entities/post";
import { LIST_POSTS_SERVICE_CONTAINER } from "@infrastructures/constants/containers";
import { ResolveController } from "@infrastructures/decorators/resolve-controller";
import { User } from "@domains/entities/user";

@injectable()
export class ListPostsController {
  constructor(
    @inject(LIST_POSTS_SERVICE_CONTAINER)
    private readonly service: Service<User['id'], Post[]>
  ) { }

  @ResolveController(ListPostsController)
  async execute(req: Request, res: Response, next: NextFunction) {
    const { id } = req.user

    const posts = await this.service.execute(id);

    res.locals.posts = posts
    next()
  }
}
