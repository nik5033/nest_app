import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'teachers',
})
export class Teachers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  middlename: string;

  @Column('real')
  character: number;

  @Column('real')
  quality: number;

  @Column('real')
  credits_exams: number;
}
