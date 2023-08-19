import { container } from "tsyringe";
import { Service } from "@api/dtos/service";
import { Follow } from "@domains/entities/follow";
import { CreateFollowService } from "@api/endpoints/follow/services/create";
import { CreateFollowDTO } from "@infrastructures/dtos/create-follow";
import { CREATE_FOLLOW_SERVICE_CONTAINER } from "@infrastructures/constants/containers";

container.registerSingleton<Service<CreateFollowDTO, Follow>>(CREATE_FOLLOW_SERVICE_CONTAINER, CreateFollowService)
