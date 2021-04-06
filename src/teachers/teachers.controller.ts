import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { TeachersService } from "./teachers.service";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService
  ) {}

  @Get()
  async getAllTeachers(){
    return this.teachersService.findAll();
  }

  @Get('/:str')
  async getTeacherByLetter(@Param('str') str: string) {
    return this.teachersService.get_by_first_letter(str);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async newTeacher(@Body() createTeacherDto: CreateTeacherDto) {
    await this.teachersService.createTeacher(createTeacherDto);
  }

  @Delete('rm/:id')
  async delUser(@Param('id') id: number) {
    await this.teachersService.deleteTeacher(id);
  }

  @Patch('chg/:id')
  @UsePipes(new ValidationPipe())
  async updateTeacher(@Param('id') id: number, @Body() updateTeacherDto: UpdateTeacherDto) {
    await this.teachersService.updateTeacher(updateTeacherDto, id);
  }
}
