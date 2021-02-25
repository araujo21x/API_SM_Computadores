import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany
} from 'typeorm';

import Mother from './mother.entity';
import PieceGrid from './pieceGrid.entity';

@Entity({ name: 'gridMothers' })
class GridMother {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => PieceGrid, pieceGrid => pieceGrid.gridMother)
  pieceGrid: PieceGrid[];

  @ManyToOne(() => Mother, mother => mother.gridMother)
  mother: Mother;

  @Column()
  mode: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}

export default GridMother;
