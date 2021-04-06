import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTeacherDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  surname: string;

  @ApiProperty()
  middlename: string;

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