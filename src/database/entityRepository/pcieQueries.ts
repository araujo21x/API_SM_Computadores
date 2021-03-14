import { EntityRepository, Repository } from 'typeorm';
import Pcie from '../entity/pcie.entity';

@EntityRepository(Pcie)
export default class PcieQueries extends Repository<Pcie> {
  public filterPcie (fields: any) {
    const {
      baseClock,
      boostClock,
      CUDACore,
      memoryInterface,
      memorySize,
      memorySpeed,
      memoryType,
      order,
      sortType
    } =
      fields;

    const query = this.createQueryBuilder('pcie');

    if (baseClock) {
      query.andWhere('pcie.baseClock = :baseClock',
        { baseClock: Number(baseClock) });
    }
    if (boostClock) {
      query.andWhere('pcie.boostClock = :boostClock',
        { boostClock: Number(boostClock) });
    }
    if (CUDACore) {
      query.andWhere('pcie.CUDACore = :CUDACore',
        { CUDACore: Number(CUDACore) });
    }
    if (memoryInterface) {
      query.andWhere('pcie.memoryInterface = :memoryInterface',
        { memoryInterface: String(memoryInterface) });
    }
    if (memorySize) {
      query.andWhere('pcie.memorySize = :memorySize',
        { memorySize: Number(memorySize) });
    }
    if (memorySpeed) {
      query.andWhere('pcie.memorySpeed = :memorySpeed',
        { memorySpeed: String(memorySpeed) });
    }
    if (memoryType) {
      query.andWhere('pcie.memoryType = :memoryType',
        { memoryType: String(memoryType) });
    }
    if (order) {
      query.orderBy(`pcie.${order}`, sortType);
    }
    return query.getMany();
  }
}
