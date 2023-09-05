import { container } from "tsyringe";

import { Service } from "@api/dtos/service";
import { Like } from "@domains/entities/like";
import { LikeService } from "@api/endpoints/like/services/like";
import { LikePostDTO } from "@api/endpoints/like/dtos/like-post";
import { UnLikeService } from "@api/endpoints/like/services/unlike";
import { UnLikePostDTO } from "@api/endpoints/like/dtos/unlike-post";
import { LIKE_POST_SERVICE_CONTAINER, UNLIKE_POST_SERVICE_CONTAINER } from "@infrastructures/constants/containers";

container.registerSingleton<Service<LikePostDTO, Like>>(LIKE_POST_SERVICE_CONTAINER, LikeService)
container.registerSingleton<Service<UnLikePostDTO, void>>(UNLIKE_POST_SERVICE_CONTAINER, UnLikeService)
