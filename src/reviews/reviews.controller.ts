import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiBearerAuth, ApiHeader, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ReviewsService } from "./reviews.service";
import { CreateReviewDto } from "./dto/create-review.dto";
import { AuthUser } from "../users/decorator/users.decorator";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import { UpdateReviewDto } from "./dto/update-review.dto";

@ApiTags('Review')
@Controller('review')
  export class ReviewsController {
  constructor(private readonly reviewService: ReviewsService,
  ) {}

  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Create review',
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(new ValidationPipe())
  async createReview(@Body() createReviewDto: CreateReviewDto, @AuthUser() user){
    return this.reviewService.createReview(createReviewDto, user.id);
  }

  @ApiResponse({
    status: 200,
    description: 'Get reviews by teacher_id',
  })
  @Get(':id')
  async getAllReviews(@Param('id') teacher_id: number) {
    return this.reviewService.findReviewsById(teacher_id);
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Delete review',
  })
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteReview(@Param('id') id: number, @AuthUser() user) {
    await this.reviewService.deleteReview(id, user.id);
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Edit review',
  })
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Patch()
  async patchReview(@Body() updateReviewDto: UpdateReviewDto, @AuthUser() user) {
    await this.reviewService.editReview(updateReviewDto, user.id);
  }
}
