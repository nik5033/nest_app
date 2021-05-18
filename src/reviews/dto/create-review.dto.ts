import { IsInt, IsNotEmpty, IsNotIn } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateReviewDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  teacher_id: number;

  @ApiProperty()
  @IsNotEmpty()
  text: string;
}