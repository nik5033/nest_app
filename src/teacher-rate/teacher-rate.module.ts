import { forwardRef, Module } from "@nestjs/common";
import { TeacherRateController } from "./teacher-rate.controller";
import { AuthModule } from "../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Teachers } from "../teachers/entities/teachers.entity";
import { Users } from "../users/entities/users.entity";
import { TeacherRates } from "./entities/teacher-rate.entity";
import { TeacherRateService } from "./teacher-rate.service";

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([TeacherRates]),
    TypeOrmModule.forFeature([Teachers]),
    TypeOrmModule.forFeature([Users])
  ],
  providers: [TeacherRateService],
  controllers: [TeacherRateController],
})
export class TeacherRateModule {}
