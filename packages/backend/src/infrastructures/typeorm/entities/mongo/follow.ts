import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";
import { Follow } from "@domains/entities/follow"

@Entity('follow')
export class FollowEntity implements Follow {
  @ObjectIdColumn()
  id: ObjectId

  @Column('uuid')
  follower_id: string;

  @Column()
  follower_username: string;

  @Column('varchar', { nullable: true })
  follower_photo?: string

  @Column('uuid')
  following_id: string;

  @Column()
  following_username: string;

  @Column('varchar', { nullable: true })
  following_photo?: string

  @Column('date')
  followed_date: Date;
}
