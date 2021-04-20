import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "../../users/entities/users.entity";
import { Teachers } from "../../teachers/entities/teachers.entity";

@Entity({
  name: 'teachers',
})
export class Reviews {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pos_rate: number;

  @Column()
  neg_rate: number;

  @ManyToOne(() => Users, (user) => user.reviews)
  user: Users;

  @ManyToOne(() => Teachers, (teacher) => teacher.reviews)
  teacher: Teachers;
}
