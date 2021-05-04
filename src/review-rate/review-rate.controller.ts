import { Body, Controller, Get, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ReviewRateService } from "./review-rate.service";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import { AuthUser } from "../users/decorator/users.decorator";
import { CreateReviewRateDto } from "./dto/create-review-rate.dto";
import { UpdateReviewRateDto } from "./dto/update-review-rate.dto";

@ApiTags('Review rates')
@Controller('review-rate')
export class ReviewRateController {
  constructor(private readonly reviewRateService: ReviewRateService
  ) {}

  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Create review rate',
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(new ValidationPipe())
  async newTeacher(@Body() createReviewRateDto: CreateReviewRateDto, @AuthUser() user) {
    await this.reviewRateService.createRate(createReviewRateDto, user.id);
  }

  @ApiResponse({
    status: 200,
    description: 'Get rates by review_id',
  })
  @Get(':id')
  async getRatesByTeacherId(@Param('id') review_id: number) {
    return this.reviewRateService.getRatesByReview(review_id);
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Change rates by id',
  })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async updateRates(@Param('id') id: number, @AuthUser() user,@Body() updateReviewRateDto: UpdateReviewRateDto) {
    await this.reviewRateService.changeRate(updateReviewRateDto, user.id, id);
  }
}
