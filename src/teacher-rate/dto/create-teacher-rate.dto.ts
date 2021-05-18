import { IsInt, IsNotEmpty, IsNotIn, Max, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTeacherRateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  teacher_id: number;

  @ApiProperty()
  @IsInt()
  @Min(-5)
  @IsNotIn([0])
  @Max(5)
  @IsNotEmpty()
  character: number;

  @ApiProperty()
  @IsInt()
  @Min(-5)
  @IsNotIn([0])
  @Max(5)
  @IsNotEmpty()
  quality: number;

  @ApiProperty()
  @IsInt()
  @Min(-5)
  @IsNotIn([0])
  @Max(5)
  @IsNotEmpty()
  credits_exams: number;
}