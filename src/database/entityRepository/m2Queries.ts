import { EntityRepository, Repository } from 'typeorm';
import M2 from '../entity/m2.entity';

@EntityRepository(M2)
export default class M2Queries extends Repository<M2> {
  public filterM2 (fields: any) {
    const {
      format,
      memorySize,
      model,
      reading,
      writing,
      order,
      sortType
    } =
      fields;

    const query = this.createQueryBuilder('m2');
    if (format) {
      query.andWhere('m2.format = :format',
        { format: String(format) });
    }
    if (memorySize) {
      query.andWhere('m2.memorySize = :memorySize',
        { memorySize: Number(memorySize) });
    }
    if (model) {
      query.andWhere('m2.model = :model',
        { model: Number(model) });
    }
    if (reading) {
      query.andWhere('m2.reading = :reading',
        { reading: String(reading) });
    }
    if (writing) {
      query.andWhere('m2.writing = :writing',
        { writing: String(writing) });
    }
    if (order) {
      query.orderBy(`m2.${order}`, sortType);
    }
    return query.getMany();
  }
}
