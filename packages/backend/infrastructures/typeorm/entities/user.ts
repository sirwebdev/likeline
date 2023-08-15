import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { User } from "@domains/entities/user";

@Entity()
export class UserEntity implements User {
  @PrimaryGeneratedColumn('uuid')
  id: string

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
  photo_filename?: string;
}
