import { container } from "tsyringe"

import { USER_REPOSITORY_CONTAINER } from "@api/constants/containers"
import { TypeormUserRepository } from "@infraestructures/typeorm/repositories/user"

container.registerSingleton(USER_REPOSITORY_CONTAINER, TypeormUserRepository)
