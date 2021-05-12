import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "../../users/entities/users.entity";
import { Teachers } from "../../teachers/entities/teachers.entity";

@Entity({
  name: 'teacher-rate',
})
export class TeacherRates {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('real')
  character: number;

  @Column('real')
  quality: number;

  @Column('real')
  credits_exams: number;

  @ManyToOne(() => Users, (user) => user.teacher_rates, {
    onDelete: 'CASCADE',
  })
  user: Users;

  @ManyToOne(() => Teachers, (teacher) => teacher.teacher_rates, {
    onDelete: 'CASCADE',
  })
  teacher: Teachers;
}