import { container } from "tsyringe";

import { ReplyRepository } from "@infrastructures/repositories/reply";
import { REPLY_REPOSITORY_CONTAINER } from "@infrastructures/constants/containers";
import { TypeormReplyRepository } from "@infrastructures/typeorm/repositories/reply";


container.registerSingleton<ReplyRepository>(REPLY_REPOSITORY_CONTAINER, TypeormReplyRepository)
