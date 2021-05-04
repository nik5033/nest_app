import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Reviews } from "../../reviews/entities/reviews.entity";
import { TeacherRates } from "../../teacher-rate/entities/teacher-rate.entity";
import { ReviewRates } from "../../review-rate/entities/review-rate.entity";

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

  @Column("varchar", { length: 200, unique: true, })
  username: string;

  @Column("varchar")
  password: string;

  @Column({ enum: roles, default: roles.USER })
  role: roles;

  @OneToMany(() => Reviews, (review) => review.user)
  reviews: Reviews[];

  @OneToMany(() => TeacherRates, (teacher_rate) => teacher_rate.user)
  teacher_rates: TeacherRates[];

  @OneToMany(() => ReviewRates, (review_rate) => review_rate.user)
  review_rate: ReviewRates[];
}
