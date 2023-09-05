import { createPost } from "../../../../utils/create-post"
import { createUser } from "../../../../utils/create-user"
import { CommentPostDTO } from "@api/endpoints/comment/dtos/post"
import { PostRepository } from "@infrastructures/repositories/post"
import { UserRepository } from "@infrastructures/repositories/user"
import { CommentPostService } from "@api/endpoints/comment/services/post"
import { CommentRepository } from "@infrastructures/repositories/comment"
import { TypeormUserRepository } from "@infrastructures/typeorm/repositories/user"
import { TypeormPostRepository } from "@infrastructures/typeorm/repositories/post"
import { TypeormCommentRepository } from "@infrastructures/typeorm/repositories/comment"
import { MockClass, createMockFromClass } from "../../../../utils/create-mock-from-class"
import { createComment } from "../../../../utils/create-comment"
import { ApiRequestError } from "@infrastructures/error-handling/api-request-error"

const USER = createUser()
const POST = createPost(USER.id)
const COMMENT = createComment(POST.id, USER.id)

let service: CommentPostService

let userRepository: MockClass<UserRepository>
let postRepository: MockClass<PostRepository>
let commentRepository: MockClass<CommentRepository>

describe("SERVICE - CommentPost", () => {
  let PAYLOAD: CommentPostDTO = {
    comment: 'Some Comment here',
    post_id: POST.id,
    user_id: USER.id
  }

  beforeEach(() => {
    userRepository = createMockFromClass(TypeormUserRepository as any)
    postRepository = createMockFromClass(TypeormPostRepository as any)
    commentRepository = createMockFromClass(TypeormCommentRepository as any)

    service = new CommentPostService(commentRepository, userRepository, postRepository)

    commentRepository.create.mockReturnValue(COMMENT)
  })

  describe("Successful cases", () => {
    beforeEach(() => {
      userRepository.findById.mockReturnValue(USER)
      postRepository.findById.mockReturnValue(POST)
    })

    it("Must create a new comment", async () => {
      const createdComment = await service.execute(PAYLOAD)

      expect(createdComment).toEqual(COMMENT)
      expect(commentRepository.create).toHaveBeenCalled()
    })
  })

  describe("Error cases", () => {
    it("Must not create a comment with an unexistent user", async () => {
      userRepository.findById.mockReturnValue(undefined)

      await expect(
        service.execute(
          {
            comment: PAYLOAD.comment,
            user_id: 'non-existent-user-id',
            post_id: PAYLOAD.post_id
          }
        )
      ).rejects.toBeInstanceOf(ApiRequestError)
    })

    it("Must not create a comment with an unexistent post", async () => {
      userRepository.findById.mockReturnValue(USER)
      postRepository.findById.mockReturnValue(undefined)

      await expect(
        service.execute(
          {
            comment: PAYLOAD.comment,
            user_id: PAYLOAD.user_id,
            post_id: 'non-existent-post-id'
          }
        )
      ).rejects.toBeInstanceOf(ApiRequestError)
    })
  })
})
