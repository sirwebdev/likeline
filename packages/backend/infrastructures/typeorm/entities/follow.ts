import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";
import { Follow } from "@domains/entities/follow"

@Entity('follow')
export class TypeormFollowEntity implements Follow {
  @ObjectIdColumn()
  id: ObjectId

  @Column('uuid')
  follower_id: string;

  @Column('uuid')
  following_id: string;

  @Column('date')
  followed_date: Date;
}
