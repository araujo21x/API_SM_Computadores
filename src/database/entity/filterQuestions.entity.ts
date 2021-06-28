import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany
}
  from 'typeorm';
import FilterResponse from './filterResponse.entity';

@Entity({ name: 'filterQuestions' })
class FilterQuestions {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => FilterResponse, filterResponse => filterResponse.filterQuestions)
  filterResponse: FilterResponse[];

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  question: string;

  @Column({ nullable: false })
  answerDB: boolean;

  @Column({ nullable: false })
  typePart: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}

export default FilterQuestions;
