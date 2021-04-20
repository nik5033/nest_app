import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Reviews } from "../../reviews/entities/reviews.entity";

@Entity({
  name: 'teachers',
})
export class Teachers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  middlename: string;

  @Column('real')
  character: number;

  @Column('real')
  quality: number;

  @Column('real')
  credits_exams: number;

  @OneToMany(() => Reviews, (review) => review.teacher)
  reviews: Reviews[];
}
