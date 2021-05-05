import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { roles, Users } from "./entities/users.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { genSalt, hash } from "bcrypt";
import { UpdateUserRoleDto } from "./dto/update-user-role.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly usersRepository: Repository<Users>,
  ) {}

  async findOne(id: number): Promise<any> {
    const user = await this.usersRepository.findOne(id);
    if (user == null) {
      throw new BadRequestException({message: "User does not exist"});
    }
    const { password, ...result } = user;
    return result;
  }

  async findAll(): Promise<Users[]> {
    return await this.usersRepository.find();
  }

  async createUser(createUserDto: CreateUserDto) {
    const exist_user = await this.usersRepository.findOne({
      username: createUserDto.username,
    });
    if (exist_user != null) {
      throw new BadRequestException({message: "User already exist"});
    }
    const salt = await genSalt();
    createUserDto.password = await hash(createUserDto.password, salt);
    const user = await this.usersRepository.create(createUserDto);
    await this.usersRepository.save(user);
  }

  async deleteUser(user_id: number) {
    const user = await this.usersRepository.findOne(user_id);
    if (user == null) {
      throw new BadRequestException({message: 'User does not exist'});
    }
    await this.usersRepository.remove(user);
  }

  async updateUser(updateUserDto: UpdateUserDto, id: number) {
    const user = await this.usersRepository.findOne(id);
    if (user == null) {
      throw new BadRequestException({ message: 'User does not exist' });
    }
    user.username = updateUserDto.username;
    await this.usersRepository.save(user);
  }

  async updateUserRole(updateUserRoleDto: UpdateUserRoleDto) {
    const user = await this.usersRepository.findOne(updateUserRoleDto.id);
    if (user == null) {
      throw new BadRequestException({message: "User does not exist"})
    }
    if (Object.values(roles).includes(user.role)) {
      throw new BadRequestException({message: "Wrong role"})
    }
    user.role = updateUserRoleDto.role;
    await this.usersRepository.save(user);
  }
}
