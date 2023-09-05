import { Router } from "express";
import { container } from "tsyringe";

import { ListPostsController } from "./controllers/list";
import { CreatePostController } from "./controllers/create";
import { uploadFile } from "@infrastructures/middlewares/upload-file";
import { injectImageLink } from "./middlewares/inject-image-link";
import { DeletePostController } from "./controllers/delete";

export const postRoutes = Router()

const listPostsController = container.resolve(ListPostsController)
const createPostController = container.resolve(CreatePostController)
const deletePostController = container.resolve(DeletePostController)

postRoutes.delete('/:post_id', deletePostController.execute)
postRoutes.get('/', listPostsController.execute, injectImageLink)
postRoutes.post('/', uploadFile.single('image'), createPostController.execute, injectImageLink)
