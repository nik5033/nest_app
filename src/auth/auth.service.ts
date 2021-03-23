import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "../users/entities/users.entity";
import { Repository } from "typeorm";
import { LoginUserDto } from "./dto/login.dto";
import { compare } from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersRepository.findOne({ username: username });
    const check_pass = await compare(pass, user.password);
    if (user && check_pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.usersRepository.create(loginUserDto);
    const payload = { username: user.username, password: user.password};
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
