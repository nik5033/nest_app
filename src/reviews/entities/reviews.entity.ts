import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Users } from "../../users/entities/users.entity";
import { Teachers } from "../../teachers/entities/teachers.entity";
import { Rate, ReviewRates } from "../../review-rate/entities/review-rate.entity";

@Entity({
  name: 'reviews',
})
export class Reviews {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int" })
  pos_rate: number;

  @Column({ type: "int" })
  neg_rate: number;

  @Column({ length: 400, type: 'varchar' })
  text: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @ManyToOne(() => Users, (user) => user.reviews, {
    onDelete: 'CASCADE',
  })
  user: Users;

  @ManyToOne(() => Teachers, (teacher) => teacher.reviews, {
    onDelete: 'CASCADE',
  })
  teacher: Teachers;

  @OneToMany(() => ReviewRates, (review_rate) => review_rate.review)
  review_rates: ReviewRates[];
}
