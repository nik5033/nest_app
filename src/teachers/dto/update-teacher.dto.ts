import { ApiProperty } from "@nestjs/swagger";

export class UpdateTeacherDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  surname: string;

  @ApiProperty()
  middlename: string;

  @ApiProperty()
  character: number;

  @ApiProperty()
  quality: number;

  @ApiProperty()
  credits_exams: number;

}