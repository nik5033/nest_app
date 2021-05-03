import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Reviews } from "../reviews/entities/reviews.entity";
import { Repository } from "typeorm";
import { Users } from "../users/entities/users.entity";
import { Rate, ReviewRates } from "./entities/review-rate.entity";
import { CreateReviewRateDto } from "./dto/create-review-rate.dto";
import { UpdateReviewRateDto } from "./dto/update-review-rate.dto";

@Injectable()
export class ReviewRateService {
  constructor(
    @InjectRepository(ReviewRates)
    private readonly reviewRatesRepository: Repository<ReviewRates>,
    @InjectRepository(Reviews)
    private readonly reviewsRepository: Repository<Reviews>,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async getRatesByReview(review_id: number) {
    const review = await this.reviewsRepository.findOne(review_id);
    if (review == null) {
      throw new BadRequestException({ message: 'Review does not exist' });
    }

    const Rates = await this.reviewRatesRepository.find({
      where: { review: review },
    });

    return Rates;
  }

  async createRate(createReviewRateDto: CreateReviewRateDto, user_id: number) {
    const review = await this.reviewsRepository.findOne(
      createReviewRateDto.review_id,
    );
    if (review == null) {
      throw new BadRequestException({ message: 'Review does not exist' });
    }

    const user = await this.usersRepository.findOne(user_id);
    if (user === null) {
      throw new BadRequestException({ message: 'User does not exist' });
    }

    const rate = await this.reviewRatesRepository.findOne({
      where: [
        {
          review: review,
          user: user,
        },
      ],
    });
    if (rate != null) {
      throw new BadRequestException({ message: 'Review Rate already exist' });
    }

    const New_Rate = await this.reviewRatesRepository.create({
      rate: createReviewRateDto.rate,
      user: user,
      review: review,
    });

    if (createReviewRateDto.rate == Rate.positive) {
      review.neg_rate += 1;
    }
    else if (createReviewRateDto.rate == Rate.negative) {
      review.pos_rate += 1;
    }
    else {
      throw new BadRequestException({ message: 'Wrong rate' });
    }

    await this.reviewsRepository.save(review);
    await this.reviewRatesRepository.save(New_Rate);
  }

  async changeRate(updateReviewRateDto: UpdateReviewRateDto, user_id: number, id: number) {
    const review_rate = await this.reviewRatesRepository.findOne(
      id,
      {relations: ['user', 'review']},
    );

    if (review_rate == null) {
      throw new BadRequestException({ message: 'Review rate does not exist' });
    }
    if (review_rate.user.id != user_id) {
      throw new ForbiddenException();
    }

    switch (updateReviewRateDto.rate) {
      case Rate.positive: {
        if (review_rate.rate == Rate.negative) {
          review_rate.review.neg_rate -= 1;
          review_rate.review.pos_rate += 1;
        }
        break;
      }
      case Rate.negative: {
        if (review_rate.rate == Rate.positive) {
          review_rate.review.pos_rate -= 1;
          review_rate.review.neg_rate += 1;
        }
        break;
      }
      case Rate.neutral: {
        if (review_rate.rate == Rate.positive) {
          review_rate.review.pos_rate -= 1;
        }
        else {
          review_rate.review.pos_rate += 1;
        }
        break;
      }
    }

    await this.reviewsRepository.save(review_rate.review);
    await this.reviewRatesRepository.update(id, updateReviewRateDto);
  }
}
