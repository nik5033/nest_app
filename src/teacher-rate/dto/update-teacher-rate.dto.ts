import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, Max, Min } from "class-validator";

export class UpdateTeacherRateDto {
  @ApiProperty()
  @IsInt()
  @Min(-5)
  @Max(5)
  @IsNotEmpty()
  character: number;

  @ApiProperty()
  @IsInt()
  @Min(-5)
  @Max(5)
  @IsNotEmpty()
  quality: number;

  @ApiProperty()
  @IsInt()
  @Min(-5)
  @Max(5)
  @IsNotEmpty()
  credits_exams: number;
}