import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, } from "typeorm";

@Entity({
  name: 'news',
})
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, type: 'varchar' })
  title: string;

  @Column({ length: 400, type: 'varchar' })
  text: string;

  @CreateDateColumn()
  createdDate: Date;
}
