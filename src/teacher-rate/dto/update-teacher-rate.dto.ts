import { ApiProperty } from "@nestjs/swagger";

export class UpdateTeacherRateDto {
  @ApiProperty()
  character: number;

  @ApiProperty()
  quality: number;

  @ApiProperty()
  credits_exams: number;
}