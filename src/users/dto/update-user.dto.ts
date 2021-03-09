import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UpdateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
  //password: string;
}