import { container } from "tsyringe";

import { CommentRepository } from "@infrastructures/repositories/comment";
import { COMMENT_REPOSITORY_CONTAINER } from "@infrastructures/constants/containers";
import { TypeormCommentRepository } from "@infrastructures/typeorm/repositories/comment";

container.registerSingleton<CommentRepository>(COMMENT_REPOSITORY_CONTAINER, TypeormCommentRepository)
