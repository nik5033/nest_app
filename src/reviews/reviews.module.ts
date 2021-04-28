import { forwardRef, Module } from "@nestjs/common";
import { ReviewsService } from './reviews.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Reviews } from "./entities/reviews.entity";
import { ReviewsController } from "./reviews.controller";
import { Users } from "../users/entities/users.entity";
import { Teachers } from "../teachers/entities/teachers.entity";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([Reviews]),
    TypeOrmModule.forFeature([Teachers]),
    TypeOrmModule.forFeature([Users])
  ],
  providers: [ReviewsService],
  controllers: [ReviewsController],
})
export class ReviewsModule {}
