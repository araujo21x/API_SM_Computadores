import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn
}
  from 'typeorm';

@Entity({ name: 'm2' })
class M2 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  type: string;

  @Column({ nullable: false })
  format: string;

  @Column({ nullable: false })
  model: number;

  @Column({ type: 'decimal', precision: 5, scale: 3, nullable: false })
  memorySize: number;

  @Column({ nullable: false })
  TDP: number;

  @Column({ nullable: false })
  reading: string;

  @Column({ nullable: false })
  writing: string;

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

export default M2;
