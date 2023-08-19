import { container } from 'tsyringe'

import { FollowRepository } from '@infrastructures/repositories/follow'
import { FOLLOW_REPOSITORY_CONTAINER } from '@infrastructures/constants/containers'
import { TypeormFollowRepository } from '@infrastructures/typeorm/repositories/follow'

container.registerSingleton<FollowRepository>(FOLLOW_REPOSITORY_CONTAINER, TypeormFollowRepository)
