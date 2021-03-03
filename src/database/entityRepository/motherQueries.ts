import { EntityRepository, Repository } from 'typeorm';
import Mother from '../entity/mother.entity';

@EntityRepository(Mother)
export default class MotherQueries extends Repository<Mother> {
  public filterMother (fields: any) {
    const {
      chipset,
      socket,
      suportM2,
      memorySizeSupport,
      memorySlotAmount,
      memorySlotType,
      motherFrequencies
    } =
      fields;

    const query = this.createQueryBuilder('mother')
      .leftJoinAndSelect('mother.motherfrequency', 'frequency')
      .leftJoinAndSelect('mother.pcieSocket', 'pcieSocket')
      .leftJoinAndSelect('mother.m2Socket', 'm2Socket')
      .leftJoinAndSelect('m2Socket.m2SocketType', 'm2SocketType');

    if (chipset) {
      query.andWhere('mother.chipset = :chipset',
        { chipset: String(chipset) });
    }
    if (socket) {
      query.andWhere('mother.socket = :socket',
        { socket: String(socket) });
    }
    if (suportM2) {
      query.andWhere('mother.suportM2 = :suportM2',
        { suportM2: Boolean(suportM2) });
    }
    if (memorySizeSupport) {
      query.andWhere('mother.memorySizeSupport = :memorySizeSupport',
        { memorySizeSupport: Number(memorySizeSupport) });
    }
    if (memorySlotAmount) {
      query.andWhere('mother.memorySlotAmount = :memorySlotAmount',
        { memorySlotAmount: Number(memorySlotAmount) });
    }
    if (memorySlotType) {
      query.andWhere('mother.memorySlotType = :memorySlotType',
        { memorySlotType: String(memorySlotType) });
    }
    if (motherFrequencies) {
      query.andWhere('frequency.frequency = :frequency',
        { frequency: Number(motherFrequencies) });
    }

    return query.getMany();
  }
}
