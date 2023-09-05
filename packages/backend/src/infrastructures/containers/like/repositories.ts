import { container } from "tsyringe";

import { LikeRepository } from "@infrastructures/repositories/like";
import { LIKE_REPOSITORY_CONTAINER } from "@infrastructures/constants/containers";
import { TypeormLikeRepository } from "@infrastructures/typeorm/repositories/like";

container.registerSingleton<LikeRepository>(LIKE_REPOSITORY_CONTAINER, TypeormLikeRepository)
