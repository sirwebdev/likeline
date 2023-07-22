import { USER_REPOSITORY_CONTAINER } from "@api/api/constants/containers"
import { TypeormUserRepository } from "@api/infraestructures/typeorm/repositories/user"
import { container } from "tsyringe"

container.registerSingleton(USER_REPOSITORY_CONTAINER, TypeormUserRepository)
