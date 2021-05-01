import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Users } from "../../users/entities/users.entity";
import { Teachers } from "../../teachers/entities/teachers.entity";

@Entity({
  name: 'reviews',
})
export class Reviews {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "float"
  })
  pos_rate: number;

  @Column(
    {
      type: "float"
    }
  )
  neg_rate: number;

  @Column({ length: 400, type: 'varchar' })
  text: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @ManyToOne(() => Users, (user) => user.reviews)
  user: Users;

  @ManyToOne(() => Teachers, (teacher) => teacher.reviews)
  teacher: Teachers;
}
