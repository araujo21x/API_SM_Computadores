import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne
} from 'typeorm';

import GridMother from './gridMother.entity';

@Entity({ name: 'pieceGrids' })
class PieceGrid {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => GridMother, gridMother => gridMother.pieceGrid)
  gridMother: GridMother;

  @Column({ nullable: false })
  type:string;

  @Column({ nullable: true })
  div:string;

  @Column({ nullable: false })
  gridColumn:string;

  @Column({ nullable: false })
  gridRow:string;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}

export default PieceGrid;
