import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { TeachersService } from "./teachers.service";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Roles } from "../auth/decorators/roles.decorator";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import { RolesGuard } from "../auth/guard/roles-auth.guard";
import { roles } from '../users/entities/users.entity';

@ApiTags("Teacher")
@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService
  ) {}

  @ApiResponse({
    status: 200,
    description: 'Get all teachers',
  })
  @Get()
  async getAllTeachers(){
    return this.teachersService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'Get teacher by first letter in surname',
  })
  @Get('/:str')
  async getTeacherByLetter(@Param('str') str: string) {
    return this.teachersService.get_by_first_letter(str);
  }

  @ApiResponse({
    status: 201,
    description: 'Create teacher',
  })
  @Roles(roles.EDITOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @UsePipes(new ValidationPipe())
  async newTeacher(@Body() createTeacherDto: CreateTeacherDto) {
    await this.teachersService.createTeacher(createTeacherDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Delete teacher by id',
  })
  @Roles(roles.EDITOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('rm/:id')
  async delUser(@Param('id') id: number) {
    await this.teachersService.deleteTeacher(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Update teacher by id',
  })
  @Roles(roles.EDITOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('chg/:id')
  @UsePipes(new ValidationPipe())
  async updateTeacher(@Param('id') id: number, @Body() updateTeacherDto: UpdateTeacherDto) {
    await this.teachersService.updateTeacher(updateTeacherDto, id);
  }
}
