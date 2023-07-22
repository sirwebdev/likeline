import { Router } from "express";

import { userRouter } from "./user";

export const apiRoutes = Router();

apiRoutes.use('/user', userRouter)