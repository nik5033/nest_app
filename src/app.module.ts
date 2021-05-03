import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { TeachersModule } from './teachers/teachers.module';
import { ReviewsController } from './reviews/reviews.controller';
import { ReviewsModule } from './reviews/reviews.module';
import { NewsModule } from './news/news.module';
import { TeacherRateController } from './teacher-rate/teacher-rate.controller';
import { TeacherRateService } from './teacher-rate/teacher-rate.service';
import { TeacherRateModule } from './teacher-rate/teacher-rate.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    AuthModule,
    TeachersModule,
    ReviewsModule,
    NewsModule,
    TeacherRateModule
  ],
})
export class AppModule {}
