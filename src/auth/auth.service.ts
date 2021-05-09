import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "../users/entities/users.entity";
import { Repository } from "typeorm";
import { LoginUserDto } from "./dto/login.dto";
import { compare } from "bcrypt";
import { Response } from "express";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersRepository.findOne({ username: username });
    if (!user) {
      throw new BadRequestException({message: "User does not exist"});
    }
    const check_pass = await compare(pass, user.password);
    if (user && check_pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginUserDto: LoginUserDto, res: Response) {
    const user = await this.usersRepository.create(loginUserDto);
    const usr = await this.usersRepository.findOne({ username: user.username });
    const payload = {
      role: usr.role,
      username: user.username,
      id: usr.id,
    };

    res.cookie('jwt', this.jwtService.sign(payload), { httpOnly: true} )

    /*return {
      token: this.jwtService.sign(payload),
    };*/
  }

  logout(res: Response) {
    res.clearCookie('jwt');
  }
}
