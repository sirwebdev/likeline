import { IdType } from "@infrastructures/typeorm/entities/user";

export class UpdateProfilePhotoDTO {
  userID: IdType;
  tempFilename: string
}
