import { EntityRepository, Repository } from 'typeorm';
import Cpu from '../entity/cpu.entity';

@EntityRepository(Cpu)
export default class cpuQueries extends Repository<Cpu> {
  public filterCpu (fields: any) {
    const {
      chipset,
      socket,
      memorySizeSupport,
      memorySlotAmount,
      cpuFrequencies,
      baseClockSpeed,
      maximumBoostSpeed,
      cache,
      core,
      threads,
      grapshicProcessor
    } =
    fields;

    const query = this.createQueryBuilder('cpu')
      .leftJoinAndSelect('cpu.cpuFrequency', 'frequency');

    if (chipset) {
      query.andWhere('cpu.chipset = :chipset',
        { chipset: String(chipset) });
    }

    if (socket) {
      query.andWhere('cpu.socket = :socket',
        { socket: String(socket) });
    }

    if (memorySizeSupport) {
      query.andWhere('cpu.memorySizeSupport = :memorySizeSupport',
        { memorySizeSupport: Number(memorySizeSupport) });
    }

    if (memorySlotAmount) {
      query.andWhere('cpu.memorySlotAmount = :memorySlotAmount',
        { memorySlotAmount: Number(memorySlotAmount) });
    }

    if (cpuFrequencies) {
      query.andWhere('frequency.frequency = :cpuFrequencies',
        { cpuFrequencies: Number(cpuFrequencies) });
    }

    if (baseClockSpeed) {
      query.andWhere('cpu.baseClockSpeed = :baseClockSpeed',
        { baseClockSpeed: Number(baseClockSpeed) });
    }

    if (maximumBoostSpeed) {
      query.andWhere('cpu.maximumBoostSpeed = :maximumBoostSpeed',
        { maximumBoostSpeed: Number(maximumBoostSpeed) });
    }

    if (core) {
      query.andWhere('cpu.core = :core',
        { core: Number(core) });
    }

    if (threads) {
      query.andWhere('cpu.threads = :threads',
        { threads: Number(threads) });
    }

    if (cache) {
      query.andWhere('cpu.cache = :cache',
        { cache: Number(cache) });
    }

    if (grapshicProcessor) {
      query.andWhere('cpu.grapshicProcessor = :grapshicProcessor',
        { grapshicProcessor: String(grapshicProcessor) });
    }
    return query.getMany();
  }

  public getCpuById (id:number) {
    return this.createQueryBuilder('cpu')
      .leftJoinAndSelect('cpu.cpuFrequency', 'frequency')
      .where('cpu.id = :id', { id })
      .getOne();
  }
}
