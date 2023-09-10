import { createUser } from "../../../../utils/create-user"
import { createPost } from "../../../../utils/create-post"
import { createComment } from "../../../../utils/create-comment"
import { ReplyCommentDTO } from "@api/endpoints/reply/dtos/comment"
import { UserRepository } from "@infrastructures/repositories/user"
import { ReplyRepository } from "@infrastructures/repositories/reply"
import { CommentRepository } from "@infrastructures/repositories/comment"
import { ReplyCommentService } from "@api/endpoints/reply/services/comment"
import { TypeormUserRepository } from "@infrastructures/typeorm/repositories/user"
import { ApiRequestError } from "@infrastructures/error-handling/api-request-error"
import { TypeormReplyRepository } from "@infrastructures/typeorm/repositories/reply"
import { TypeormCommentRepository } from "@infrastructures/typeorm/repositories/comment"
import { MockClass, createMockFromClass } from "../../../../utils/create-mock-from-class"

let service: ReplyCommentService
let userRepository: MockClass<UserRepository>
let replyRepository: MockClass<ReplyRepository>
let commentRepository: MockClass<CommentRepository>

describe("SERVICE - ReplyComment", () => {
  const USER = createUser()
  const POST = createPost(USER.id)
  const COMMENT = createComment(POST.id, USER.id)

  const PAYLOAD: ReplyCommentDTO = {
    user_id: USER.id,
    comment_id: COMMENT.id,
    comment: 'some-comment-here',
  }


  beforeEach(() => {
    userRepository = createMockFromClass(TypeormUserRepository as any)
    replyRepository = createMockFromClass(TypeormReplyRepository as any)
    commentRepository = createMockFromClass(TypeormCommentRepository as any)

    service = new ReplyCommentService(replyRepository, commentRepository, userRepository)
  })

  describe("Successful cases", () => {

    beforeEach(() => {
      userRepository.findById.mockReturnValue(USER)
      commentRepository.findById.mockReturnValue(COMMENT)
    })

    it("Must reply an existent comment", async () => {
      await service.execute(PAYLOAD)

      expect(replyRepository.reply).toHaveBeenCalledWith({
        comment_id: PAYLOAD.comment_id,
        user: expect.objectContaining({
          id: USER.id,
          username: USER.username,
          photo_filename: USER.photo_filename
        }),
        comment: PAYLOAD.comment
      })
    })
  })

  describe("Error cases", () => {
    it("Must not create a reply if user not exists", async () => {
      userRepository.findById.mockReturnValue(undefined)

      await expect(service.execute({
        ...PAYLOAD,
        user_id: 'NON_EXISTENT_USER_ID'
      })).rejects.toBeInstanceOf(ApiRequestError)
    })

    it("Must not create a reply if comment not exists", async () => {
      userRepository.findById.mockReturnValue(USER)
      commentRepository.findById.mockReturnValue(undefined)

      await expect(service.execute({
        ...PAYLOAD,
        comment_id: 'NON_EXISTENT_COMMENT_ID'
      })).rejects.toBeInstanceOf(ApiRequestError)
    })
  })
})

