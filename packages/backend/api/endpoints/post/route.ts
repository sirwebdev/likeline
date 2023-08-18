import { Router } from "express";
import { container } from "tsyringe";
import { CreatePostController } from "./controllers/create";
import { uploadFile } from "@infrastructures/middlewares/upload-file";

export const postRoutes = Router()

const createPostController = container.resolve(CreatePostController)

postRoutes.post('/', uploadFile.single('image'), createPostController.execute)
