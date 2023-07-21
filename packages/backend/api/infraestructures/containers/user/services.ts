import { container } from 'tsyringe'

import { CREATE_USER_SERVICE_CONTAINER } from '../../../constants/containers'
import { CreateUserService } from '../../../endpoints/user/services/create'

container.registerSingleton(CREATE_USER_SERVICE_CONTAINER, CreateUserService)
