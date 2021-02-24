import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn
}
  from 'typeorm';

import Mother from './mother.entity';
import M2SocketType from './m2SocketType.entity';

@Entity({ name: 'm2Sockets' })
class M2Socket {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Mother, mother => mother.id)
  @JoinColumn()
  mother: Mother;

  @OneToMany(() => M2SocketType, m2SocketType => m2SocketType.m2Socker)
  m2SocketType: M2SocketType[];

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}

export default M2Socket;
