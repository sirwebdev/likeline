import { container } from "tsyringe"

import { UserRepository } from "@infrastructures/repositories/user"
import { USER_REPOSITORY_CONTAINER } from "@infrastructures/constants/containers"
import { TypeormUserRepository } from "@infrastructures/typeorm/repositories/user"

container.registerSingleton<UserRepository>(USER_REPOSITORY_CONTAINER, TypeormUserRepository)
