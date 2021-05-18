import { IsEnum, IsInt, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Rate } from "../entities/review-rate.entity";

export class CreateReviewRateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  review_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Rate)
  rate: Rate;
}