import { forwardRef, Module } from "@nestjs/common";
import { ReviewRateService } from './review-rate.service';
import { ReviewRateController } from './review-rate.controller';
import { AuthModule } from "../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "../users/entities/users.entity";
import { ReviewRates } from "./entities/review-rate.entity";
import { Reviews } from "../reviews/entities/reviews.entity";

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([ReviewRates]),
    TypeOrmModule.forFeature([Reviews]),
    TypeOrmModule.forFeature([Users])
  ],
  providers: [ReviewRateService],
  controllers: [ReviewRateController]
})
export class ReviewRateModule {}
