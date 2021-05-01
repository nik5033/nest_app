import { ApiProperty } from "@nestjs/swagger";
import { roles } from "../entities/users.entity";

export class UpdateUserRoleDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  role: roles;
}