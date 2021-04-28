import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateReviewDto {
  @ApiProperty()
  @IsNotEmpty()
  pos_rate: number;

  @ApiProperty()
  @IsNotEmpty()
  neg_rate: number;

  @ApiProperty()
  @IsNotEmpty()
  teacher_id: number;

  @ApiProperty()
  @IsNotEmpty()
  text: string;
}