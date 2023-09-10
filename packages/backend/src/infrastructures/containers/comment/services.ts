import { container } from "tsyringe";

import { Service } from "@api/dtos/service";
import { Comment } from "@domains/entities/comment"
import { CommentPostDTO } from "@api/endpoints/comment/dtos/post";
import { ReplyCommentDTO } from "@api/endpoints/comment/dtos/reply";
import { CommentPostService } from "@api/endpoints/comment/services/post";
import { ReplyCommentService } from "@api/endpoints/comment/services/reply";
import { COMMENT_POST_SERVICE_CONTAINER, REPLY_COMMENT_SERVICE_CONTAINER } from "@infrastructures/constants/containers";

container.registerSingleton<Service<CommentPostDTO, Comment>>(COMMENT_POST_SERVICE_CONTAINER, CommentPostService)
container.registerSingleton<Service<ReplyCommentDTO, Comment>>(REPLY_COMMENT_SERVICE_CONTAINER, ReplyCommentService)
