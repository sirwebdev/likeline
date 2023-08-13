import { Column, Entity, ObjectId } from "typeorm";

import { User } from "@domains/entities/user";
import { IdColumn } from "../decorators/id-column";

export type IdType = string | ObjectId;

@Entity()
export class UserEntity implements User {
  @IdColumn()
  id: IdType

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({
    nullable: true
  })
  photo_url?: string;
}
