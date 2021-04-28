import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { UsersService } from './users.service';
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import { Roles } from "../auth/decorators/roles.decorator";
import { RolesGuard } from "../auth/guard/roles-auth.guard";
import { ApiProperty, ApiResponse, ApiTags } from "@nestjs/swagger";
import { roles } from "./entities/users.entity";
import { AuthUser } from "./decorator/users.decorator";

@ApiTags("Users")
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService
  ) {}

  @ApiResponse({
    status: 200,
    description: 'Get all users',
  })
  @Get()
  async getAllUsers(){
    return this.usersService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'Get user by id',
  })
  @Roles(roles.ADMIN, roles.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async getUser(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @ApiResponse({
    status: 201,
    description: 'Create new user(registration)',
  })
  @Post('new')
  @UsePipes(new ValidationPipe())
  async newUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Delete user by id',
  })
  @Roles(roles.ADMIN, roles.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('rm')
  async delUser(@AuthUser() user: any) {
    await this.usersService.deleteUser(user.id);
  }

  @ApiResponse({
    status: 200,
    description: 'Delete user by id(for admin)',
  })
  @Roles(roles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('rm/:id')
  async delUserAdmin(@Param('id') id: number) {
    await this.usersService.deleteUser(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Update user by id',
  })
  @Roles(roles.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(new ValidationPipe())
  @Patch('chg/:id')
  async updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    await this.usersService.updateUser(updateUserDto, id);
  }
}
