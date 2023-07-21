import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";

import { User } from "../../../../domains/user";

@Entity()
export class UserEntity implements User {
  @ObjectIdColumn()
  id: ObjectId

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
