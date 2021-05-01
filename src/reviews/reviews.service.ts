import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reviews } from './entities/reviews.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { Teachers } from '../teachers/entities/teachers.entity';
import { roles, Users } from '../users/entities/users.entity';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Reviews)
    private readonly reviewsRepository: Repository<Reviews>,
    @InjectRepository(Teachers)
    private readonly teachersRepository: Repository<Teachers>,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async findAllreviews(): Promise<Reviews[]> {
    return await this.reviewsRepository.find();
  }

  async createReview(createReviewDto: CreateReviewDto, user_id: number) {
    const teacher = await this.teachersRepository.findOne(createReviewDto.teacher_id);
    if (teacher == null) {
      throw new BadRequestException({message: "Teacher does not exist"});
    }
    const user = await this.usersRepository.findOne(user_id);
    if (user == null) {
      throw new BadRequestException({message: "User does not exist"});
    }
    const review = await this.reviewsRepository.create({
      pos_rate: createReviewDto.pos_rate,
      neg_rate: createReviewDto.neg_rate,
      text: createReviewDto.text,
      teacher: teacher,
      user: user,
    });
    review.teacher = teacher;
  }

  async deleteReview(review_id: number, user_id: number) {
    const user = await this.usersRepository.findOne(user_id);
    if (user == null) {
      throw new BadRequestException({message: "User does not exist"});
    }
    const Role = user.role;
    const review = await this.reviewsRepository.findOne(review_id);
    if (review == null) {
      throw new BadRequestException({message: "Review does not exist"});
    }
    if (
      (Role == roles.USER && user_id == review.user.id) ||
      Role == roles.EDITOR
    ) {
      await this.reviewsRepository.remove(review);
    } else {
      throw new ForbiddenException();
    }
  }

  async editReview(updateReviewDto: UpdateReviewDto, user_id: string) {
    const user = await this.usersRepository.findOne(user_id);
    const review = await this.reviewsRepository.findOne(
      updateReviewDto.review_id,
    );

    if (review.user.id == user.id) {
      review.text = updateReviewDto.text;
      await this.reviewsRepository.save(review);
    } else {
      throw new ForbiddenException();
    }
  }
}
