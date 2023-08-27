import { container } from "tsyringe";
import { Service } from "@api/dtos/service";
import { Like } from "@domains/entities/like";
import { LikeService } from "@api/endpoints/like/services/like";
import { LikePostDTO } from "@api/endpoints/like/dtos/like-post";
import { LIKE_POST_SERVICE_CONTAINER } from "@infrastructures/constants/containers";

container.registerSingleton<Service<LikePostDTO, Like>>(LIKE_POST_SERVICE_CONTAINER, LikeService)
