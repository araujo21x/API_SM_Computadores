import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn
}
  from 'typeorm';

@Entity({ name: 'ram' })
class Ram {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  type: string;

  @Column({ nullable: false })
  memorySlotType: string;

  @Column({ nullable: false })
  memoryFrequency: number;

  @Column({ type: 'decimal', precision: 5, scale: 3, nullable: false })
  memorySize: number;

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

  @Column({ nullable: false, default: 4 })
  quantity: number;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}

export default Ram;
