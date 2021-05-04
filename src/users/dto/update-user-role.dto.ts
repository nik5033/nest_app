import { ApiProperty } from "@nestjs/swagger";
import { roles } from "../entities/users.entity";
import { IsNotEmpty } from "class-validator";

export class UpdateUserRoleDto {
  @ApiProperty()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  role: roles;
}