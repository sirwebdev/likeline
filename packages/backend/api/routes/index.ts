import { Router } from "express";

import { userRouter } from "./user";
import { authRouter } from "./auth";
import { postRoutes } from "@api/endpoints/post/route";

import { authenticateRequest } from "@infrastructures/middlewares/authenticate-request";

export const apiRoutes = Router();

apiRoutes.use('/auth', authRouter)
apiRoutes.use('/users', userRouter)

apiRoutes.use(authenticateRequest)
apiRoutes.use('/posts', postRoutes)
