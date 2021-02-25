import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany
} from 'typeorm';

import CpuFrequency from './cpuFrequency.entity';

@Entity({ name: 'cpus' })
class Cpu {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => CpuFrequency, cpuFrequency => cpuFrequency.cpu)
  cpuFrequency: CpuFrequency[];

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  type: string;

  @Column({ nullable: false })
  image: string;

  @Column({ nullable: false })
  imageId: string;

  @Column({ nullable: false })
  dropImage: string;

  @Column({ nullable: false })
  dropImageId: string;

  @Column({ nullable: false })
  socket: string;

  @Column({ nullable: false })
  chipset: string;

  @Column({ nullable: false })
  threads: number;

  @Column({ nullable: false })
  core: number;

  @Column({ type: 'decimal', precision: 5, scale: 3, nullable: false })
  baseClockSpeed: number;

  @Column({ type: 'decimal', precision: 5, scale: 3, nullable: false })
  maximumBoostSpeed: number;

  @Column({ nullable: false })
  cache: number;

  @Column()
  graphicsProcessor: string;

  @Column({ nullable: false })
  memorySupportAmountSlot: number;

  @Column({ type: 'decimal', precision: 5, scale: 3, nullable: false })
  memorySizeSupport: number;

  @Column({ nullable: false })
  TDP: number;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}

export default Cpu;
