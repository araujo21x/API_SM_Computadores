import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn
}
  from 'typeorm';

import Cpu from './cpu.entity';

@Entity({ name: 'cpuFrequencies' })
class CpuFrequency {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cpu, cpu => cpu.id)
  cpu: Cpu;

  @Column({ nullable: false })
  frequency: number

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
export default CpuFrequency;
