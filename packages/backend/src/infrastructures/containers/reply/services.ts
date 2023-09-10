import { container } from "tsyringe";

import { Service } from "@api/dtos/service";
import { Reply } from "@domains/entities/reply";
import { ReplyCommentDTO } from "@api/endpoints/reply/dtos/comment";
import { ReplyCommentService } from "@api/endpoints/reply/services/comment";
import { REPLY_COMMENT_SERVICE_CONTAINER } from "@infrastructures/constants/containers";

container.registerSingleton<Service<ReplyCommentDTO, Reply>>(REPLY_COMMENT_SERVICE_CONTAINER, ReplyCommentService)
