import { Controller, Post, UseGuards, Body, UsePipes, ValidationPipe, Res } from "@nestjs/common";
import { AuthService } from './auth.service';
import { LoginUserDto } from "./dto/login.dto";
import { LocalAuthGuard } from "./guard/local-auth.guard";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService
  ) {}

  @ApiResponse({
    status: 201,
    description: 'Login',
  })
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @UsePipes(new ValidationPipe())
  async login(@Body() loginUserDto: LoginUserDto,@Res({passthrough: true}) response: Response) {
    this.authService.login(loginUserDto, response);
  }

  @ApiResponse({
    status: 200,
    description: 'Logout',
  })
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    this.authService.logout(response);
  }

}
