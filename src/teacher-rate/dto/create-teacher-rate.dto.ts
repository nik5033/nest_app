import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTeacherRateDto {
  @ApiProperty()
  @IsNotEmpty()
  teacher_id: number;

  @ApiProperty()
  @IsNotEmpty()
  character: number;

  @ApiProperty()
  @IsNotEmpty()
  quality: number;

  @ApiProperty()
  @IsNotEmpty()
  credits_exams: number;
}