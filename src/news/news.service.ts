import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { News } from "./entities/news.entity";
import { CreateNewsDto } from "./dto/create-news.dto";
import { UpdateNewsDto } from "./dto/update-news.dto";

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News) private readonly newsRepository: Repository<News>,
  ) {}

  async findAll(): Promise<News[]> {
    return await this.newsRepository.find();
  }


  async createNews(createNewsDto: CreateNewsDto) {
    const news = await this.newsRepository.create(createNewsDto);
    await this.newsRepository.save(news);
  }

  async deleteNews(news_id: number) {
    const news = await this.newsRepository.findOne(news_id);
    if (news == null) {
      throw new BadRequestException({ message: 'News do not exist' });
    }
    await this.newsRepository.remove(news);
  }

  async updateNews(updateNewsDto: UpdateNewsDto, news_id: number) {

    const news = await this.newsRepository.findOne(news_id);
    if (news == null) {
      throw new BadRequestException({ message: 'Teacher does not exist' });
    }
    await this.newsRepository.update(news_id, updateNewsDto);
  }
}
