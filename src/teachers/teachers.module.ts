import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Teachers } from "../teachers/entities/teachers.entity";
import { UsersService } from "../users/users.service";
import { UsersController } from "../users/users.controller";
import { TeachersController } from "./teachers.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Teachers])],
  providers: [TeachersService],
  controllers: [TeachersController],
})
export class TeachersModule {}

