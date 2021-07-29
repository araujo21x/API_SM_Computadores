import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany
} from 'typeorm';

import GridMother from './gridMother.entity';
import M2Socket from './m2Socket.entity';
import PcieSocket from './PcieSocket.entity';
import Motherfrequency from './motherFrequency.entity';

@Entity({ name: 'mothers' })
class Mother {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => M2Socket, m2Socket => m2Socket.mother)
  m2Socket: M2Socket[];

  @OneToMany(() => GridMother, gridMother => gridMother.mother)
  gridMother: GridMother[];

  @OneToMany(() => PcieSocket, pcieSocket => pcieSocket.mother)
  pcieSocket: PcieSocket[];

  @OneToMany(() => Motherfrequency, motherfrequency => motherfrequency.mother)
  motherfrequency: Motherfrequency[];

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
  memorySlotAmount: number;

  @Column({ type: 'decimal', precision: 6, scale: 3, nullable: false })
  memorySizeSupport: number;

  @Column({ nullable: false })
  memorySlotType: string;

  @Column({ nullable: false })
  TDP: number;

  @Column({ nullable: false })
  hasSocketM2: boolean;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}

export default Mother;
