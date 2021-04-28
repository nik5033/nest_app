import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teachers } from './entities/teachers.entity';
import { Repository } from 'typeorm';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

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
    const teacher = await this.teachersRepository.create(createTeacherDto);
    await this.teachersRepository.save(teacher);
  }

  async deleteTeacher(teacher_id: number) {
    const teacher = await this.teachersRepository.findOne(teacher_id);
    if (teacher == null) {
      throw new BadRequestException({ message: 'Teacher does not exist' });
    }
    await this.teachersRepository.remove(teacher);
  }

  async updateTeacher(updateTeacherDto: UpdateTeacherDto, teacher_id: number) {

    const teacher = await this.teachersRepository.findOne(teacher_id);
    if (teacher == null) {
      throw new BadRequestException({ message: 'Teacher does not exist' });
    }
    await this.teachersRepository.update(teacher_id, updateTeacherDto);
  }
}
