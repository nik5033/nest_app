import { forwardRef, Module } from "@nestjs/common";
import { ReviewRateService } from './review-rate.service';
import { ReviewRateController } from './review-rate.controller';
import { AuthModule } from "../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TeacherRates } from "../teacher-rate/entities/teacher-rate.entity";
import { Teachers } from "../teachers/entities/teachers.entity";
import { Users } from "../users/entities/users.entity";
import { TeacherRateService } from "../teacher-rate/teacher-rate.service";
import { TeacherRateController } from "../teacher-rate/teacher-rate.controller";

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([TeacherRates]),
    TypeOrmModule.forFeature([Teachers]),
    TypeOrmModule.forFeature([Users])
  ],
  providers: [ReviewRateService],
  controllers: [ReviewRateController]
})
export class ReviewRateModule {}
