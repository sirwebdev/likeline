import { Router } from "express";

import { userRouter } from "./user";
import { authRouter } from "./auth";

export const apiRoutes = Router();

apiRoutes.use('/auth', authRouter)
apiRoutes.use('/users', userRouter)
