import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateReviewDto {
  @ApiProperty()
  @IsNotEmpty()
  text: string;

  @ApiProperty()
  @IsNotEmpty()
  review_id: number;


}