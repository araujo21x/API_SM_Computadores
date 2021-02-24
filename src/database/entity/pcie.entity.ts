import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn
}
  from 'typeorm';

@Entity({ name: 'Pcie' })
class Pcie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  type: string;

  @Column({ nullable: false })
  PCIeType: string;

  @Column({ nullable: false })
  PCIeVersion: number;

  @Column({ nullable: false })
  boostClock: number;

  @Column({ nullable: false })
  baseClock: number;

  @Column({ nullable: false })
  memoryType: string;

  @Column({ nullable: false })
  memorySize: number;

  @Column({ nullable: false })
  CUDACore: number;

  @Column({ nullable: false })
  memorySpeed: string;

  @Column({ nullable: false })
  memoryInterface: string;

  @Column({ nullable: false })
  TDP: number;

  @Column({ nullable: false })
  image: string;

  @Column({ nullable: false })
  imageId: string;

  @Column({ nullable: false })
  dropImage: string;

  @Column({ nullable: false })
  dropImageId: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}

export default Pcie;
