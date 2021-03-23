import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from './entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { genSalt, hash } from "bcrypt";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly usersRepository: Repository<Users>,
  ) {}

  async findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      const salt = await genSalt();
      const hashpass = await hash(createUserDto.password, salt);
      createUserDto.password = hashpass;
      const user = await this.usersRepository.create(createUserDto);
      await this.usersRepository.save(user);
    }
    catch(e) {
      throw new HttpException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: e.toString(),
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteUser(user_id: number) {
    try {
      const user = await this.usersRepository.findOne(user_id);
      if (user == null) {
          throw new HttpException({
            statusCode: HttpStatus.BAD_REQUEST,
          }, HttpStatus.BAD_REQUEST)
      }
      await this.usersRepository.remove(user);
    }
    catch (e) {
      if (e instanceof HttpException) {
        throw new HttpException({
            statusCode: HttpStatus.BAD_REQUEST,
            message: e.toString(),
        }, HttpStatus.BAD_REQUEST)
      }
      throw new HttpException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: e.toString(),
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async updateUser(updateUserDto: UpdateUserDto, id: number) {
    try {
      const user = await this.usersRepository.findOne(id);
      user.username = updateUserDto.username;
      await this.usersRepository.save(user);
    }
    catch (e) {
      throw new HttpException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: e.toString(),
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
