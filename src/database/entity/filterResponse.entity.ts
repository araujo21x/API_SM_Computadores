import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne
}
  from 'typeorm';
import FilterQuestions from './filterQuestions.entity';

@Entity({ name: 'filterResponse' })
class FilterResponse {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => FilterQuestions, filterQuestions => filterQuestions.id)
  filterQuestions: FilterQuestions;

  @Column({ nullable: false })
  value: string;

  @Column({ nullable: false })
  text: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}

export default FilterResponse;
