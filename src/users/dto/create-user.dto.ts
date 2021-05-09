import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { roles } from "../entities/users.entity";

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  role: roles;
}
