import { ApiProperty } from "@nestjs/swagger";
import { roles } from "../entities/users.entity";
import { IsEnum, IsInt, IsNotEmpty } from "class-validator";

export class UpdateUserRoleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(roles)
  role: roles;
}