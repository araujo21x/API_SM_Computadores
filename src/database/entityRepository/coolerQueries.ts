import { EntityRepository, Repository } from 'typeorm';
import Cooler from '../entity/cooler.entity';

@EntityRepository(Cooler)
export default class CoolerQueries extends Repository<Cooler> {
  public filterCooler (fields: any) {
    const {
      compatibilityCpu,
      speedFan,
      fanAirflow,
      order,
      sortType
    } =
      fields;

    const query = this.createQueryBuilder('cooler')
      .leftJoinAndSelect('cooler.coolerCompatibility', 'compatibilityCpu');

    if (compatibilityCpu) {
      query.andWhere('compatibilityCpu.compatibilityCpu = :compatibilityCpu',
        { compatibilityCpu: String(compatibilityCpu) });
    }

    if (speedFan) {
      query.andWhere('cooler.speedFan = :speedFan',
        { speedFan: Number(speedFan) });
    }

    if (fanAirflow) {
      query.andWhere('cooler.fanAirflow = :fanAirflow',
        { fanAirflow: Number(fanAirflow) });
    }

    if (order) {
      order !== 'compatibilityCpu'
        ? query.orderBy(`cooler.${order}`, sortType)
        : query.orderBy('compatibilityCpu.compatibilityCpu', sortType);
    }

    return query.getMany();
  }

  public getCoolerById (id: number) {
    return this.createQueryBuilder('cooler')
      .leftJoinAndSelect('cooler.coolerCompatibility', 'compatibilityCpu')
      .where('cooler.id = :id', { id })
      .getOne();
  }
}
