import { ApiProperty } from "@nestjs/swagger";
import { Rate } from "../entities/review-rate.entity";
import { IsNotEmpty } from "class-validator";

export class UpdateReviewRateDto {
  @ApiProperty()
  @IsNotEmpty()
  rate: Rate;
}