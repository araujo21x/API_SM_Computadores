import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany
}
  from 'typeorm';

import CoolerCompatibility from './coolerCompatibility.entity';

@Entity({ name: 'coolers' })
class Cooler {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => CoolerCompatibility, coolerCompatibility => coolerCompatibility.cooler)
  coolerCompatibility: CoolerCompatibility[];

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  type: string;

  @Column({ nullable: false })
  speedFan: number;

  @Column({ nullable: false })
  fanAirflow: number;

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

export default Cooler;
