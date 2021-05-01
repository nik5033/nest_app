import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateNewsDto {
  @ApiProperty({
    maxLength: 100,
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    maxLength: 400,
  })
  @IsNotEmpty()
  text: string;
}