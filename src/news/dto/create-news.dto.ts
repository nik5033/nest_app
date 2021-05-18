import { IsNotEmpty, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateNewsDto {
  @ApiProperty({
    maxLength: 100,
  })
  @MaxLength(100)
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    maxLength: 400,
  })
  @IsNotEmpty()
  @MaxLength(400)
  text: string;
}