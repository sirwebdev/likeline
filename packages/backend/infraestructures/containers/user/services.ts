import { CREATE_USER_SERVICE_CONTAINER } from '@api/api/constants/containers'
import { CreateUserService } from '@api/api/endpoints/user/services/create'
import { container } from 'tsyringe'

container.registerSingleton(CREATE_USER_SERVICE_CONTAINER, CreateUserService)
