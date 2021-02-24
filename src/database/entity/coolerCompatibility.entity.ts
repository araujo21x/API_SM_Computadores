import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne
}
  from 'typeorm';

import Cooler from './cooler.entity';

@Entity({ name: 'coolerCompatibilitys' })
class CoolerCompatibility {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cooler, cooler => cooler.id)
  cooler: Cooler;

  @Column({ nullable: false })
  compatibilityCpu: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}

export default CoolerCompatibility;
