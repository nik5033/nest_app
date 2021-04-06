import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teachers } from './entities/teachers.entity';
import { Repository } from 'typeorm';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from "./dto/update-teacher.dto";

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teachers)
    private readonly teachersRepository: Repository<Teachers>,
  ) {}

  async findAll(): Promise<Teachers[]> {
    return await this.teachersRepository.find();
  }

  async get_by_first_letter(letter: string): Promise<Teachers[]> {
    const teachers = await this.teachersRepository.find();
    const find_teachers = [];
    for (const teacher of teachers) {
      if (teacher.surname.charAt(0) === letter) {
        find_teachers.push(teacher);
      }
    }
    return find_teachers;
  }

  async createTeacher(createTeacherDto: CreateTeacherDto) {
    try {
      const teacher = await this.teachersRepository.create(createTeacherDto);
      await this.teachersRepository.save(teacher);
    }
    catch (e) {
      if (e instanceof HttpException) {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            message: e.toString(),
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: e.toString(),
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async deleteTeacher(teacher_id: number) {
    try {
      const teacher = await this.teachersRepository.findOne(teacher_id);
      if (teacher == null) {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Teacher does not exist',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      await this.teachersRepository.remove(teacher);
    } catch (e) {
      if (e instanceof HttpException) {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            message: e.toString(),
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: e.toString(),
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateTeacher(updateTeacherDto: UpdateTeacherDto, teacher_id: number) {
    try {
      const teacher = await this.teachersRepository.findOne(teacher_id);
      if (teacher != null) {
        await this.teachersRepository.update(teacher_id, updateTeacherDto);
      }
      else{
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Teacher does not exist',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    catch (e) {
      if (e instanceof HttpException) {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            message: e.toString(),
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: e.toString(),
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
