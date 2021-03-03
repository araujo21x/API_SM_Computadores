import { EntityRepository, Repository } from 'typeorm';
import Rom from '../entity/rom.entity';

@EntityRepository(Rom)
export default class RomQueries extends Repository<Rom> {
  public filterRom (fields: any) {
    const {
      memorySize,
      reading,
      writing,
      rotation
    } =
      fields;

    const query = this.createQueryBuilder('rom');

    if (memorySize) {
      query.andWhere('rom.memorySize = :memorySize',
        { memorySize: Number(memorySize) });
    }
    if (reading) {
      query.andWhere('rom.reading = :reading',
        { reading: String(reading) });
    }
    if (writing) {
      query.andWhere('rom.writing = :writing',
        { writing: String(writing) });
    }
    if (rotation) {
      query.andWhere('rom.rotation = :rotation',
        { rotation: Number(rotation) });
    }
    return query.getMany();
  }
}
