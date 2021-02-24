/* eslint-disable no-unused-vars */
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn,
  JoinColumn
} from 'typeorm';

import M2Socket from './m2Socket.entity';

@Entity({ name: 'm2SocketTypes' })
class M2SocketTypes {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => M2Socket, m2Socket => m2Socket.id)
  @JoinColumn()
  m2Socker: M2Socket;

  @Column({ nullable: false })
  type: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}

export default M2SocketTypes;
