import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum roles {
  ADMIN = 'admin',
  EDITOR = 'editor',
  USER = 'user',
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

  @Column({ enum: roles, default: roles.USER })
  role: roles;
}
