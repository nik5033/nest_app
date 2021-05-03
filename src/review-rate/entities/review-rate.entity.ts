import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "../../users/entities/users.entity";
import { Reviews } from "../../reviews/entities/reviews.entity";

export enum Rate {
  negative = -1,
  positive = 1,
  neutral = 0,
}

@Entity({
  name: 'review-rate',
})
export class ReviewRates {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: Rate })
  rate: Rate;

  @ManyToOne(() => Users, (user) => user.review_rate)
  user: Users;

  @ManyToOne(() => Reviews, (review) => review.review_rates)
  review: Reviews;
}