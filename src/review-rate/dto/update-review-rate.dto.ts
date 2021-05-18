import { ApiProperty } from "@nestjs/swagger";
import { Rate } from "../entities/review-rate.entity";
import { IsEnum, IsNotEmpty } from "class-validator";

export class UpdateReviewRateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Rate)
  rate: Rate;
}