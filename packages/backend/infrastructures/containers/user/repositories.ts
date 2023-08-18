import { container } from "tsyringe"

import { UserRepository } from "@infrastructures/repositories/user"
import { PostRepository } from "@infrastructures/repositories/post"
import { TypeormUserRepository } from "@infrastructures/typeorm/repositories/user"
import { TypeormPostRepository } from "@infrastructures/typeorm/repositories/post"
import { POST_REPOSITORY_CONTAINER, USER_REPOSITORY_CONTAINER } from "@infrastructures/constants/containers"

container.registerSingleton<UserRepository>(USER_REPOSITORY_CONTAINER, TypeormUserRepository)
container.registerSingleton<PostRepository>(POST_REPOSITORY_CONTAINER, TypeormPostRepository)
