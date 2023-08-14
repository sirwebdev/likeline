import { Router } from "express";
import { container } from "tsyringe";

import { uploadFile } from "@infrastructures/middlewares/upload-file";
import { CreateUserController } from "../endpoints/user/controllers/create";
import { ProfileController } from "@api/endpoints/user/controllers/profile";
import { DeleteUserController } from "@api/endpoints/user/controllers/delete";
import { authenticateRequest } from "@infrastructures/middlewares/authenticate-request";
import { UpdateProfilePhotoController } from "@api/endpoints/user/controllers/update-profile-photo";

export const userRouter = Router();

const profileController = container.resolve(ProfileController)
const createUserController = container.resolve(CreateUserController)
const deleteUserController = container.resolve(DeleteUserController)
const updateProfilePhotoController = container.resolve(UpdateProfilePhotoController)

userRouter.post('', createUserController.execute)

userRouter.use(authenticateRequest)
userRouter.delete('', deleteUserController.execute)
userRouter.get('/profile', profileController.execute)
userRouter.put('/profile-photo', uploadFile.single('photo'), updateProfilePhotoController.execute)
