import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Users } from "../../users/entities/users.entity";
import { Teachers } from "../../teachers/entities/teachers.entity";

@Entity({
  name: 'news',
})
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, type: 'varchar' })
  title: string;

  @Column({ length: 400, type: 'varchar' })
  text: string;

  @CreateDateColumn()
  createdDate: Date;
}
