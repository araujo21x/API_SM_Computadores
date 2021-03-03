import { EntityRepository, Repository } from 'typeorm';
import Ram from '../entity/ram.entity';

@EntityRepository(Ram)
export default class RamQueries extends Repository<Ram> {
  public filterRam (fields: any) {
    const {
      memoryFrequency,
      memorySize,
      memorySlotType
    } =
      fields;

    const query = this.createQueryBuilder('ram');

    if (memoryFrequency) {
      query.andWhere('ram.memoryFrequency = :memoryFrequency',
        { memoryFrequency: Number(memoryFrequency) });
    }

    if (memorySize) {
      query.andWhere('ram.memorySize = :memorySize',
        { memorySize: Number(memorySize) });
    }

    if (memorySlotType) {
      query.andWhere('ram.memorySlotType = :memorySlotType',
        { memorySlotType: String(memorySlotType) });
    }
    return query.getMany();
  }
}
