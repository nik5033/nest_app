import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { NewsService } from "./news.service";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Roles } from "../auth/decorators/roles.decorator";
import { roles } from "../users/entities/users.entity";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import { RolesGuard } from "../auth/guard/roles-auth.guard";
import { CreateNewsDto } from "./dto/create-news.dto";
import { UpdateNewsDto } from "./dto/update-news.dto";


@ApiTags("News")
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService
  ) {
  }

  @ApiResponse({
    status: 200,
    description: 'Get all news',
  })
  @Get()
  async getAllTeachers() {
    return this.newsService.findAll();
  }


  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Create news',
  })
  @Roles(roles.EDITOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @UsePipes(new ValidationPipe())
  async newTeacher(@Body() createNewsDto: CreateNewsDto) {
    await this.newsService.createNews(createNewsDto);
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Delete news by id',
  })
  @Roles(roles.EDITOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('rm/:id')
  async delUser(@Param('id') id: number) {
    await this.newsService.deleteNews(id);
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Update news by id',
  })
  @Roles(roles.EDITOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('chg/:id')
  @UsePipes(new ValidationPipe())
  async updateTeacher(@Param('id') id: number, @Body() updateNewsDto: UpdateNewsDto) {
    await this.newsService.updateNews(updateNewsDto, id);
  }
}