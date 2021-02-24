import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn
}
  from 'typeorm';

import Mother from './mother.entity';

@Entity({ name: 'motherfrequencies' })
class Motherfrequency {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Mother, mother => mother.motherfrequency)
  mother: Mother;

  @Column()
  frequency: number

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
export default Motherfrequency;
