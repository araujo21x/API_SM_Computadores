import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn
}
  from 'typeorm';

@Entity({ name: 'psu' })
class Psu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  type: string;

  @Column({ nullable: false })
  wattage: number;

  @Column({ nullable: false })
  voltage: string;

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

export default Psu;
