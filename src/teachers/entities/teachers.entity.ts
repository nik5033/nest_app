import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Reviews } from "../../reviews/entities/reviews.entity";
import { TeacherRates } from "../../teacher-rate/entities/teacher-rate.entity";

@Entity({
  name: 'teachers',
})
export class Teachers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  surname: string;

  @Column('varchar')
  middlename: string;

  @Column('real')
  character: number;

  @Column('real')
  quality: number;

  @Column('real')
  credits_exams: number;

  @OneToMany(() => Reviews, (review) => review.teacher)
  reviews: Reviews[];

  @OneToMany(() => TeacherRates, (teacher_rate) => teacher_rate.teacher)
  teacher_rates: TeacherRates[];
}
