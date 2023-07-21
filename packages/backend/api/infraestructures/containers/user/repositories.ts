import { container } from "tsyringe"

import { TypeormUserRepository } from "../../typeorm/repositories/user"
import { USER_REPOSITORY_CONTAINER } from "../../../constants/containers"


container.registerSingleton(USER_REPOSITORY_CONTAINER, TypeormUserRepository)
