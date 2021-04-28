import { forwardRef, Module } from "@nestjs/common";
import { TeachersService } from './teachers.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Teachers } from "../teachers/entities/teachers.entity";
import { TeachersController } from "./teachers.controller";
import { AuthModule } from "../auth/auth.module";
import { Users } from "../users/entities/users.entity";

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([Teachers]),
    TypeOrmModule.forFeature([Users])
  ],
  providers: [TeachersService],
  controllers: [TeachersController],
})
export class TeachersModule {}

