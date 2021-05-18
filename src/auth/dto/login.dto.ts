import { IsNotEmpty, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(200)
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(200)
  password: string;
}