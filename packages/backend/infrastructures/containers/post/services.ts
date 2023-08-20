import { container } from 'tsyringe'

import { Service } from '@api/dtos/service'
import { CREATE_POST_SERVICE_CONTAINER, LIST_POSTS_SERVICE_CONTAINER } from '@infrastructures/constants/containers'

import { User } from '@domains/entities/user'
import { Post } from '@domains/entities/post'
import { CreatePostDTO } from '@api/endpoints/post/dtos/create'
import { ListPostsService } from '@api/endpoints/post/services/list'
import { CreatePostService } from '@api/endpoints/post/services/create'

container.registerSingleton<Service<User['id'], Post[]>>(LIST_POSTS_SERVICE_CONTAINER, ListPostsService)
container.registerSingleton<Service<CreatePostDTO, Post>>(CREATE_POST_SERVICE_CONTAINER, CreatePostService)
