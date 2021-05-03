import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateReviewRateDto {
  @ApiProperty({
    type: 'int',
  })
  @IsNotEmpty()
  review_id: number;

  @ApiProperty()
  @IsNotEmpty()
  rate: number;
}