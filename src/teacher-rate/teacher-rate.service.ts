import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Teachers } from "../teachers/entities/teachers.entity";
import { Users } from "../users/entities/users.entity";
import { TeacherRates } from "./entities/teacher-rate.entity";
import { CreateTeacherRateDto } from "./dto/create-teacher-rate.dto";
import { UpdateTeacherRateDto } from "./dto/update-teacher-rate.dto";

@Injectable()
export class TeacherRateService {
  constructor(
    @InjectRepository(TeacherRates)
    private readonly teacherRateRepository: Repository<TeacherRates>,
    @InjectRepository(Teachers)
    private readonly teachersRepository: Repository<Teachers>,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async getRatesByTeacher(teacher_id: number) {
    const teacher = await this.teachersRepository.findOne(teacher_id);
    if (teacher == null) {
      throw new BadRequestException({ message: 'Teacher does not exist' });
    }

    return await this.teacherRateRepository.find({
      where: { teacher: teacher },
    });
  }

  async createRate(createTeacherRateDto: CreateTeacherRateDto, user_id: number) {
    const teacher = await this.teachersRepository.findOne(
      createTeacherRateDto.teacher_id,
    );
    if (teacher == null) {
      throw new BadRequestException({ message: 'Teacher does not exist' });
    }

    const user = await this.usersRepository.findOne(user_id);
    if (user == null) {
      throw new BadRequestException({ message: 'User does not exist' });
    }

    const Rate = await this.teacherRateRepository.findOne({
      where: [
        {
          teacher: teacher,
          user: user,
        },
      ],
    });
    if (Rate != null) {
      throw new BadRequestException({ message: 'Rate already exist' });
    }

    const New_Rate = await this.teacherRateRepository.create({
      character: createTeacherRateDto.character,
      quality: createTeacherRateDto.quality,
      credits_exams: createTeacherRateDto.credits_exams,
      user: user,
      teacher: teacher,
    });

    teacher.character += New_Rate.character;
    teacher.credits_exams += New_Rate.credits_exams;
    teacher.quality += New_Rate.quality;
    teacher.rate_count += 1;

    await this.teachersRepository.save(teacher);
    await this.teacherRateRepository.save(New_Rate);

  }

  async changeRate(updateTeacherRateDto: UpdateTeacherRateDto, user_id: number, id: number) {
    const Rate = await this.teacherRateRepository.findOne(
      id, {relations: ['user', 'teacher']},
    );
    if (Rate == null) {
      throw new BadRequestException({ message: 'Rate does not exist' });
    }
    if (Rate.user.id != user_id) {
      throw new ForbiddenException();
    }
    for (const prop of Object.getOwnPropertyNames(updateTeacherRateDto)) {
      Rate.teacher[prop] += -Rate.teacher[prop] + updateTeacherRateDto[prop];
    }

    await this.teachersRepository.save(Rate.teacher);
    await this.teacherRateRepository.update(id, updateTeacherRateDto);
  }

  async deleteRate(user_id: number, id: number) {
    const Rate = await this.teacherRateRepository.findOne(
      id, {relations: ['user', 'teacher']},
    );
    if (Rate == null) {
      throw new BadRequestException({ message: 'Rate does not exist' });
    }
    if (Rate.user.id != user_id) {
      throw new ForbiddenException();
    }

    Rate.teacher.character -= Rate.character;
    Rate.teacher.credits_exams -= Rate.credits_exams;
    Rate.teacher.quality -= Rate.quality;
    Rate.teacher.rate_count -= 1;

    await this.teachersRepository.save(Rate.teacher);
    await this.teacherRateRepository.remove(Rate);
  }
}
