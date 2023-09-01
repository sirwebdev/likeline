import { Router } from "express";

import { userRouter } from "./user";
import { authRouter } from "./auth";
import { postRoutes } from "@api/endpoints/post/route";
import { likeRoutes } from "@api/endpoints/like/routes";
import { followRoutes } from "@api/endpoints/follow/route";
import { commentRoutes } from "@api/endpoints/comment/route";

import { authenticateRequest } from "@infrastructures/middlewares/authenticate-request";

export const apiRoutes = Router();

apiRoutes.use('/auth', authRouter)
apiRoutes.use('/users', userRouter)

apiRoutes.use(authenticateRequest)
apiRoutes.use('/posts', postRoutes)
apiRoutes.use('/likes', likeRoutes)
apiRoutes.use('/follow', followRoutes)
apiRoutes.use('/comments', commentRoutes)
