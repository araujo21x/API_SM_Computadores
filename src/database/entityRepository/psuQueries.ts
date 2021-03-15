import { EntityRepository, Repository } from 'typeorm';
import Psu from '../entity/psu.entity';

@EntityRepository(Psu)
export default class PsuQueries extends Repository<Psu> {
  public filterPsu (fields: any) {
    const {
      voltage,
      wattage,
      order,
      sortType
    } =
      fields;

    const query = this.createQueryBuilder('psu');
    if (voltage) {
      query.andWhere('psu.voltage = :voltage',
        { voltage: String(voltage) });
    }
    if (wattage) {
      query.andWhere('psu.wattage = :wattage',
        { wattage: Number(wattage) });
    }
    if (order) {
      query.orderBy(`psu.${order}`, sortType);
    }
    return query.getMany();
  }
}
