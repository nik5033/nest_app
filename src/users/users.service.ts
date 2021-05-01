import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "./entities/users.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { genSalt, hash } from "bcrypt";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly usersRepository: Repository<Users>,
  ) {}

  async findOne(id: number): Promise<any> {
    const { password, ...result } = await this.usersRepository.findOne(id);
    return result;
  }

  async findAll(): Promise<Users[]> {
    return await this.usersRepository.find();
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      const salt = await genSalt();
      createUserDto.password = await hash(createUserDto.password, salt);
      const user = await this.usersRepository.create(createUserDto);
      await this.usersRepository.save(user);
    }
    catch(e) {
      throw new HttpException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: e.toString(),
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteUser(user_id: number) {
    try {
      const user = await this.usersRepository.findOne(user_id);
      if (user == null) {
        throw new BadRequestException({message: 'user does not exist'});
      }
      await this.usersRepository.remove(user);
    } catch (e) {
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
