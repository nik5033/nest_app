import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { UsersService } from './users.service';
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import { Roles } from "../auth/decorators/roles.decorator";
import { RolesGuard } from "../auth/guard/roles-auth.guard";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Users")
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService
  ) {}

  @Get()
  async getAllUsers(){
    return this.usersService.findAll();
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async getUser(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Post('new')
  @UsePipes(new ValidationPipe())
  async newUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('rm/:id')
  async delUser(@Param('id') id: number) {
    await this.usersService.deleteUser(id);
  }

  @Roles('user')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(new ValidationPipe())
  @Patch('chg/:id')
  async updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    await this.usersService.updateUser(updateUserDto, id);
  }
}
