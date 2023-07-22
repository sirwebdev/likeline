import { container } from 'tsyringe'

import { CREATE_USER_SERVICE_CONTAINER } from '@api/constants/containers'
import { CreateUserService } from '@api/endpoints/user/services/create'

container.registerSingleton(CREATE_USER_SERVICE_CONTAINER, CreateUserService)
