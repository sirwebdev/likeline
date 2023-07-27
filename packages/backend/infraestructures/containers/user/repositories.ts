import { container } from "tsyringe"

import { UserRepository } from "@infraestructures/repositories/user"
import { USER_REPOSITORY_CONTAINER } from "@api/constants/containers"
import { TypeormUserRepository } from "@infraestructures/typeorm/repositories/user"

container.registerSingleton<UserRepository>(USER_REPOSITORY_CONTAINER, TypeormUserRepository)
