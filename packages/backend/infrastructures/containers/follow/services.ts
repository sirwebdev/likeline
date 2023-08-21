import { container } from "tsyringe";

import { Service } from "@api/dtos/service";
import { Follow } from "@domains/entities/follow";
import { CreateFollowDTO } from "@infrastructures/dtos/create-follow";
import { DeleteFollowDTO } from "@infrastructures/dtos/delete-follow";
import { UnFollowService } from "@api/endpoints/follow/services/unfollow";
import { CreateFollowService } from "@api/endpoints/follow/services/create";
import { CREATE_FOLLOW_SERVICE_CONTAINER, DELETE_FOLLOW_SERVICE_CONTAINER } from "@infrastructures/constants/containers";

container.registerSingleton<Service<DeleteFollowDTO, void>>(DELETE_FOLLOW_SERVICE_CONTAINER, UnFollowService)
container.registerSingleton<Service<CreateFollowDTO, Follow>>(CREATE_FOLLOW_SERVICE_CONTAINER, CreateFollowService)
