import { container } from 'tsyringe'

import { User } from '@domains/entities/user'
import { Service } from '@api/endpoints/user/dtos/service'
import { CreateUserDTO } from '@api/endpoints/user/dtos/create-user'
import { CreateUserService } from '@api/endpoints/user/services/create'
import { CREATE_USER_SERVICE_CONTAINER } from '@api/constants/containers'

container.registerSingleton<Service<CreateUserDTO, User>>(CREATE_USER_SERVICE_CONTAINER, CreateUserService)
