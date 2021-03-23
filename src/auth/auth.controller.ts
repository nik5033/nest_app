import { Controller, Post, UseGuards, Request, Body } from "@nestjs/common";
import { AuthService } from './auth.service';
import { LoginUserDto } from "./dto/login.dto";
import { LocalAuthGuard } from "./guard/local-auth.guard";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
}
