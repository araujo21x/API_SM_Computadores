import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn
} from 'typeorm';

import Mother from './mother.entity';

@Entity({ name: 'PCIeSockets' })
class PcieSocket {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Mother, mother => mother.id)
  mother: Mother;

  @Column({ nullable: false })
  type: string;

  @Column({ nullable: false })
  version: number;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}

export default PcieSocket;
