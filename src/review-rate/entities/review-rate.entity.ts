import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

  @Column( { enum: Rate, type: "int"})
  rate: Rate;

  @ManyToOne(() => Users, (user) => user.review_rate, {
    onDelete: 'CASCADE',
  })
  user: Users;

  @ManyToOne(() => Reviews, (review) => review.review_rates, {
    onDelete: 'CASCADE',
  })
  review: Reviews;
}