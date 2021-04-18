import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum Roles {
    ADMIN = 'admin',
    EDITOR = 'editor',
    USER = 'user'
}

@Entity({
  name: 'users',
})
export class Users {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  username: string;

  @Column()
  password: string;

  @Column({ enum: Roles, default: Roles.USER })
  role: Roles;
}