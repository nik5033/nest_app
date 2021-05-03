import { Body, Controller, Get, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import { TeacherRateService } from "./teacher-rate.service";
import { CreateTeacherRateDto } from "./dto/create-teacher-rate.dto";
import { AuthUser } from "../users/decorator/users.decorator";
import { UpdateTeacherRateDto } from "./dto/update-teacher-rate.dto";

@ApiTags('Teacher rates')
@Controller('teacher-rate')
export class TeacherRateController {
  constructor(private readonly teacherRateService: TeacherRateService
  ) {}

  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Create teacher rate',
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(new ValidationPipe())
  async newTeacher(@Body() createTeacherRateDto: CreateTeacherRateDto, @AuthUser() user) {
    await this.teacherRateService.createRate(createTeacherRateDto, user.id);
  }

  @ApiResponse({
    status: 200,
    description: 'Get rates by teacher_id',
  })
  @Get(':id')
  async getRatesByTeacherId(@Param('id') teacher_id: number) {
    return this.teacherRateService.getRatesByTeacher(teacher_id);
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Change rates by id',
  })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async updateRates(@Param('id') id: number, @AuthUser() user,@Body() updateTeacherRateDto: UpdateTeacherRateDto) {
    await this.teacherRateService.changeRate(updateTeacherRateDto, user.id, id);
  }
}
