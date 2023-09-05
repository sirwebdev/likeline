import { container } from 'tsyringe'

import { Service } from '@api/dtos/service'
import { User } from '@domains/entities/user'
import { CreateUserDTO } from '@api/endpoints/user/dtos/create-user'
import { CreateUserService } from '@api/endpoints/user/services/create'
import { CREATE_POST_SERVICE_CONTAINER, CREATE_USER_SERVICE_CONTAINER, DELETE_USER_SERVICE_CONTAINER, PROFILE_SERVICE_CONTAINER, UPDATE_PROFILE_PHOTO_SERVICE_CONTAINER } from '@infrastructures/constants/containers'

import { Post } from '@domains/entities/post'
import { ProfileDTO } from '@api/endpoints/user/dtos/profile'
import { CreatePostDTO } from '@api/endpoints/post/dtos/create'
import { ProfileService } from '@api/endpoints/user/services/profile'
import { CreatePostService } from '@api/endpoints/post/services/create'
import { DeleteUserService } from '@api/endpoints/user/services/delete'
import { UpdateProfilePhotoDTO } from '@api/endpoints/user/dtos/update-profile-photo'
import { UpdateProfilePhotoService } from '@api/endpoints/user/services/update-profile-photo'

container.registerSingleton<Service<string, ProfileDTO>>(PROFILE_SERVICE_CONTAINER, ProfileService)
container.registerSingleton<Service<string, void>>(DELETE_USER_SERVICE_CONTAINER, DeleteUserService)
container.registerSingleton<Service<CreatePostDTO, Post>>(CREATE_POST_SERVICE_CONTAINER, CreatePostService)
container.registerSingleton<Service<CreateUserDTO, User>>(CREATE_USER_SERVICE_CONTAINER, CreateUserService)
container.registerSingleton<Service<UpdateProfilePhotoDTO, ProfileDTO>>(UPDATE_PROFILE_PHOTO_SERVICE_CONTAINER, UpdateProfilePhotoService)
