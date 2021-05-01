import { forwardRef, Module } from "@nestjs/common";
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { News } from "./entities/news.entity";
import { AuthModule } from "../auth/auth.module";
import { Users } from "../users/entities/users.entity";

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([News]),
    TypeOrmModule.forFeature([Users])
  ],
  controllers: [NewsController],
  providers: [NewsService]
})
export class NewsModule {}
