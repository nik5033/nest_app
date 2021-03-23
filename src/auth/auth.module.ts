import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from "./strategy/jwt.strategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "../users/entities/users.entity";
import { AuthController } from './auth.controller';
import { LocalStrategy } from "./strategy/local.strategy";

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.secret,
      signOptions: { expiresIn: '1000000s' },
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
