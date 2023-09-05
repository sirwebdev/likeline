import { container } from "tsyringe"

import { PostRepository } from "@infrastructures/repositories/post"
import { TypeormPostRepository } from "@infrastructures/typeorm/repositories/post"
import { POST_REPOSITORY_CONTAINER } from "@infrastructures/constants/containers"

container.registerSingleton<PostRepository>(POST_REPOSITORY_CONTAINER, TypeormPostRepository)
