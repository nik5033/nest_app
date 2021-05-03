import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { TeachersModule } from './teachers/teachers.module';
import { ReviewsModule } from './reviews/reviews.module';
import { NewsModule } from './news/news.module';
import { TeacherRateModule } from './teacher-rate/teacher-rate.module';
import { ReviewRateModule } from './review-rate/review-rate.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    AuthModule,
    TeachersModule,
    ReviewsModule,
    NewsModule,
    TeacherRateModule,
    ReviewRateModule
  ],
})
export class AppModule {}
