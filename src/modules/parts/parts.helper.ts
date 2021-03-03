import { getRepository, getConnection } from 'typeorm';
import { ResponseCode } from '../../helpers/response/responseCode';

import MotherQueries from '../../database/entityRepository/motherQueries';
import CpuQueries from '../../database/entityRepository/cpuQueries';
import CoolerQueries from '../../database/entityRepository/coolerQueries';
import RamQueries from '../../database/entityRepository/ramQueries';
import PcieQueries from '../../database/entityRepository/pcieQueries';
import RomQueries from '../../database/entityRepository/romQueries';
import M2Queries from '../../database/entityRepository/m2Queries';
import PsuQueries from '../../database/entityRepository/psuQueries';

import Mother from '../../database/entity/mother.entity';
import Cpu from '../../database/entity/cpu.entity';
import Cooler from '../../database/entity/cooler.entity';
import Ram from '../../database/entity/ram.entity';
import Pcie from '../../database/entity/pcie.entity';
import Psu from '../../database/entity/psu.entity';
import Rom from '../../database/entity/rom.entity';
import Recorder from '../../database/entity/recorder.entity';
import M2 from '../../database/entity/m2.entity';

class PartsHelper {
  public async findParts (type: string): Promise<Array<any>> {
    let parts: Array<any> = [];

    switch (type) {
      case 'motherBoard':
        parts = await getRepository(Mother).createQueryBuilder('mother')
          .leftJoinAndSelect('mother.motherfrequency', 'frequency')
          .leftJoinAndSelect('mother.pcieSocket', 'pcieSocket')
          .leftJoinAndSelect('mother.m2Socket', 'm2Socket')
          .leftJoinAndSelect('m2Socket.m2SocketType', 'm2SocketType')
          .getMany();

        parts = parts.map((element: Mother) => this.motherResponse(element));
        break;
      case 'cpu':
        parts = await getRepository(Cpu).createQueryBuilder('cpu')
          .leftJoinAndSelect('cpu.cpuFrequency', 'frequency')
          .getMany();

        parts = parts.map((element: Cpu) => this.cpuResponse(element));
        break;
      case 'cooler':
        parts = await getRepository(Cooler).createQueryBuilder('cooler')
          .leftJoinAndSelect('cooler.coolerCompatibility', 'compatibilityCpu')
          .getMany();

        parts = parts.map((element: Cooler) => this.coolerResponse(element));
        break;
      case 'ram':
        parts = await getRepository(Ram).createQueryBuilder('ram')
          .getMany();

        parts = parts.map((element: Ram) => this.ramResponse(element));
        break;
      case 'rom':
        parts = await getRepository(Rom).createQueryBuilder('rom')
          .getMany();

        parts = parts.map((element: Rom) => this.romResponse(element));
        break;
      case 'm2':
        parts = await getRepository(M2).createQueryBuilder('m2')
          .getMany();

        parts = parts.map((element: M2) => this.m2Response(element));
        break;
      case 'pciExpress':
        parts = await getRepository(Pcie).createQueryBuilder('pcie')
          .getMany();

        parts = parts.map((element: Pcie) => this.pcieExpressResponse(element));
        break;
      case 'powerSupply':
        parts = await getRepository(Psu).createQueryBuilder('psu')
          .getMany();

        parts = parts.map((element: Psu) => this.psuResponse(element));
        break;
      case 'recorder':
        parts = await getRepository(Recorder).createQueryBuilder('recorder')
          .getMany();

        parts = parts.map((element: Recorder) => this.recorderResponse(element));
        break;
    }

    return parts;
  }

  public validateTypeVariable (fields: any): void {
    switch (String(fields.type)) {
      case 'motherBoard':
        this.isValidMotherFilter(fields);
        break;
      case 'cpu':
        this.isValidCpu(fields);
        break;
      case 'cooler':
        this.isValidCooler(fields);
        break;
      case 'ram':
        this.isValidRam(fields);
        break;
      case 'pciExpress':
        this.isValidPci(fields);
        break;
      case 'rom':
        this.isValidRom(fields);
        break;
      case 'm2':
        this.isValidM2(fields);
        break;
      case 'powerSupply':
        this.isPsu(fields);
        break;
    }
  }

  public async findByFilter (fields: any): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      switch (String(fields.type)) {
        case 'motherBoard':
          getConnection().transaction(async transaction => {
            const motherQueries: MotherQueries = transaction.getCustomRepository(MotherQueries);

            motherQueries.filterMother(fields)
              .then((mothers: Mother[]) => {
                if (fields.motherFrequencies) {
                  const newMothers = mothers.map((element: any) => {
                    return getRepository(Mother).createQueryBuilder('mother')
                      .leftJoinAndSelect('mother.motherfrequency', 'frequency')
                      .leftJoinAndSelect('mother.pcieSocket', 'pcieSocket')
                      .leftJoinAndSelect('mother.m2Socket', 'm2Socket')
                      .leftJoinAndSelect('m2Socket.m2SocketType', 'm2SocketType')
                      .where('mother.id = :id', { id: element.id })
                      .getOne();
                  });

                  Promise.all(newMothers).then(motherProm => {
                    resolve(motherProm.map((element: any) => {
                      return this.motherResponse(element);
                    }));
                  })
                    .catch(err => reject(err));
                };
                resolve(mothers.map((element: Mother) => this.motherResponse(element)));
              })
              .catch((err) => reject(err));
          });
          break;
        case 'cpu':
          getConnection().transaction(async transaction => {
            const cpuQueries: CpuQueries = transaction.getCustomRepository(CpuQueries);
            cpuQueries.filterCpu(fields)
              .then((cpus: Cpu[]) => {
                if (fields.cpuFrequencies) {
                  const newCpus = cpus.map(cpu => cpuQueries.getCpuById(cpu.id));
                  Promise.all(newCpus)
                    .then(promiseCpu => {
                      resolve(promiseCpu.map((element:any) => this.cpuResponse(element)));
                    })
                    .catch((err) => reject(err));
                }
                resolve(cpus.map((element: Cpu) => this.cpuResponse(element)));
              })
              .catch((err) => reject(err));
          });
          break;
        case 'cooler':
          getConnection().transaction(async transaction => {
            const coolerQueries: CoolerQueries = transaction.getCustomRepository(CoolerQueries);
            coolerQueries.filterCooler(fields)
              .then((coolers: Cooler[]) => {
                if (fields.compatibilityCpu) {
                  const newCoolers = coolers.map(cooler => coolerQueries.getCoolerById(cooler.id));
                  Promise.all(newCoolers)
                    .then(promiseCooler => {
                      resolve(promiseCooler.map((element:any) => this.coolerResponse(element)));
                    })
                    .catch((err) => reject(err));
                }
                resolve(coolers.map((element: Cooler) => this.coolerResponse(element)));
              })
              .catch((err) => reject(err));
          });
          break;
        case 'ram':
          getConnection().transaction(async transaction => {
            const ramQueries: RamQueries = transaction.getCustomRepository(RamQueries);
            ramQueries.filterRam(fields)
              .then((ramArray: Ram[]) => {
                resolve(ramArray.map((element: Ram) => this.ramResponse(element)));
              })
              .catch((err) => reject(err));
          });
          break;
        case 'pciExpress':
          getConnection().transaction(async transaction => {
            const pcieQueries: PcieQueries = transaction.getCustomRepository(PcieQueries);
            pcieQueries.filterPcie(fields)
              .then((pcieArray: Pcie[]) => {
                resolve(pcieArray.map((element: Pcie) => this.pcieExpressResponse(element)));
              })
              .catch((err) => reject(err));
          });
          break;
        case 'rom':
          getConnection().transaction(async transaction => {
            const romQueries: RomQueries = transaction.getCustomRepository(RomQueries);
            romQueries.filterRom(fields)
              .then((romArray: Rom[]) => {
                resolve(romArray.map((element: Rom) => this.romResponse(element)));
              })
              .catch((err) => reject(err));
          });
          break;
        case 'm2':
          getConnection().transaction(async transaction => {
            const m2Queries: M2Queries = transaction.getCustomRepository(M2Queries);
            m2Queries.filterM2(fields)
              .then((m2Array: M2[]) => {
                resolve(m2Array.map((element: M2) => this.m2Response(element)));
              })
              .catch((err) => reject(err));
          });
          break;
        case 'powerSupply':
          getConnection().transaction(async transaction => {
            const psuQueries: PsuQueries = transaction.getCustomRepository(PsuQueries);
            psuQueries.filterPsu(fields)
              .then((psuArray: Psu[]) => {
                resolve(psuArray.map((element: Psu) => this.psuResponse(element)));
              })
              .catch((err) => reject(err));
          });
          break;
      }
    });
  }

  // Find
  private motherResponse (mother: Mother): any {
    const newMother: any = mother;

    newMother.memorySizeSupport = Number(mother.memorySizeSupport);

    newMother.memorySlotFrequency = mother.motherfrequency.map((element: any) => {
      return element.frequency;
    });

    newMother.socketPCIE = mother.pcieSocket.map((element: any) => {
      return { type: element.type, version: element.version };
    });

    newMother.socketM2 = mother.m2Socket.map((element: any) => {
      const type: Array<string> = element.m2SocketType.map((item: any) => item.type);
      return { type };
    });

    newMother.motherfrequency = undefined;
    newMother.pcieSocket = undefined;
    newMother.m2Socket = undefined;
    newMother.imageId = undefined;
    newMother.dropImageId = undefined;
    newMother.updatedAt = undefined;
    newMother.createdAt = undefined;

    return newMother;
  }

  private cpuResponse (cpu: Cpu): any {
    const newCpu: any = cpu;

    newCpu.baseClockSpeed = Number(cpu.baseClockSpeed);
    newCpu.maximumBoostSpeed = Number(cpu.maximumBoostSpeed);
    newCpu.memorySizeSupport = Number(cpu.memorySizeSupport);
    newCpu.memorySupportFrequency = cpu.cpuFrequency.map(element => {
      return element.frequency;
    });
    newCpu.cpuFrequency = undefined;
    newCpu.imageId = undefined;
    newCpu.dropImageId = undefined;
    newCpu.updatedAt = undefined;
    newCpu.createdAt = undefined;

    return newCpu;
  }

  private coolerResponse (cooler: Cooler): any {
    const newCooler: any = cooler;

    newCooler.compatibilityCpu = cooler.coolerCompatibility.map((element) => {
      return element.compatibilityCpu;
    });
    newCooler.coolerCompatibility = undefined;
    newCooler.imageId = undefined;
    newCooler.dropImageId = undefined;
    newCooler.updatedAt = undefined;
    newCooler.createdAt = undefined;

    return newCooler;
  }

  private ramResponse (ram: Ram): any {
    const newRam: any = ram;

    newRam.memorySize = Number(ram.memorySize);
    newRam.imageId = undefined;
    newRam.dropImageId = undefined;
    newRam.updatedAt = undefined;
    newRam.createdAt = undefined;

    return newRam;
  }

  private romResponse (rom: Rom): any {
    const newRom: any = rom;

    newRom.memorySize = Number(rom.memorySize);
    newRom.imageId = undefined;
    newRom.dropImageId = undefined;
    newRom.updatedAt = undefined;
    newRom.createdAt = undefined;

    return newRom;
  }

  private m2Response (m2: M2): any {
    const newM2: any = m2;

    newM2.memorySize = Number(m2.memorySize);
    newM2.imageId = undefined;
    newM2.dropImageId = undefined;
    newM2.updatedAt = undefined;
    newM2.createdAt = undefined;

    return newM2;
  }

  private pcieExpressResponse (pcie: Pcie): any {
    const newPcie: any = pcie;

    newPcie.memorySize = Number(pcie.memorySize);
    newPcie.imageId = undefined;
    newPcie.dropImageId = undefined;
    newPcie.updatedAt = undefined;
    newPcie.createdAt = undefined;

    return newPcie;
  }

  private psuResponse (psu: Psu): any {
    const newPsu: any = psu;

    newPsu.imageId = undefined;
    newPsu.dropImageId = undefined;
    newPsu.updatedAt = undefined;
    newPsu.createdAt = undefined;

    return newPsu;
  }

  private recorderResponse (recorder: Recorder): any {
    const newRecorder: any = recorder;

    newRecorder.imageId = undefined;
    newRecorder.dropImageId = undefined;
    newRecorder.updatedAt = undefined;
    newRecorder.createdAt = undefined;

    return newRecorder;
  }

  // filter

  private isValidMotherFilter (fields: any): void {
    const {
      suportM2,
      memorySizeSupport,
      memorySlotAmount,
      motherFrequencies
    } = fields;
    if (suportM2 !== undefined) {
      if (suportM2 !== 'true' && suportM2 !== 'false') throw new Error(ResponseCode.E_004_001);
    }

    if (memorySizeSupport !== undefined) {
      if (isNaN(Number(memorySizeSupport))) throw new Error(ResponseCode.E_004_001);
    }

    if (memorySlotAmount !== undefined) {
      if (isNaN(Number(memorySlotAmount))) throw new Error(ResponseCode.E_004_001);
    }

    if (motherFrequencies !== undefined) {
      if (isNaN(Number(motherFrequencies))) throw new Error(ResponseCode.E_004_001);
    }
  }

  private isValidCpu (fields: any): void {
    const {
      memorySizeSupport,
      memorySlotAmount,
      cpuFrequencies,
      baseClockSpeed,
      maximumBoostSpeed,
      cache,
      core,
      threads
    } = fields;

    if (memorySizeSupport !== undefined) {
      if (isNaN(Number(memorySizeSupport))) throw new Error(ResponseCode.E_004_001);
    }

    if (memorySlotAmount !== undefined) {
      if (isNaN(Number(memorySlotAmount))) throw new Error(ResponseCode.E_004_001);
    }

    if (cpuFrequencies !== undefined) {
      if (isNaN(Number(cpuFrequencies))) throw new Error(ResponseCode.E_004_001);
    }

    if (baseClockSpeed !== undefined) {
      if (isNaN(Number(baseClockSpeed))) throw new Error(ResponseCode.E_004_001);
    }

    if (maximumBoostSpeed !== undefined) {
      if (isNaN(Number(maximumBoostSpeed))) throw new Error(ResponseCode.E_004_001);
    }

    if (cache !== undefined) {
      if (isNaN(Number(cache))) throw new Error(ResponseCode.E_004_001);
    }

    if (core !== undefined) {
      if (isNaN(Number(core))) throw new Error(ResponseCode.E_004_001);
    }

    if (threads !== undefined) {
      if (isNaN(Number(threads))) throw new Error(ResponseCode.E_004_001);
    }
  }

  private isValidCooler (fields: any): void {
    const {
      speedFan,
      fanAirflow
    } = fields;

    if (speedFan !== undefined) {
      if (isNaN(Number(speedFan))) throw new Error(ResponseCode.E_004_001);
    }

    if (fanAirflow !== undefined) {
      if (isNaN(Number(fanAirflow))) throw new Error(ResponseCode.E_004_001);
    }
  }

  private isValidRam (fields: any): void {
    const {
      memoryFrequency,
      memorySize
    } = fields;

    if (memoryFrequency !== undefined) {
      if (isNaN(Number(memoryFrequency))) throw new Error(ResponseCode.E_004_001);
    }

    if (memorySize !== undefined) {
      if (isNaN(Number(memorySize))) throw new Error(ResponseCode.E_004_001);
    }
  }

  private isValidPci (fields: any): void {
    const {
      baseClock,
      boostClock,
      CUDACore,
      memorySize
    } = fields;

    if (baseClock !== undefined) {
      if (isNaN(Number(baseClock))) throw new Error(ResponseCode.E_004_001);
    }
    if (boostClock !== undefined) {
      if (isNaN(Number(boostClock))) throw new Error(ResponseCode.E_004_001);
    }
    if (CUDACore !== undefined) {
      if (isNaN(Number(CUDACore))) throw new Error(ResponseCode.E_004_001);
    }
    if (memorySize !== undefined) {
      if (isNaN(Number(memorySize))) throw new Error(ResponseCode.E_004_001);
    }
  }

  private isValidRom (fields: any): void {
    const {
      memorySize,
      rotation
    } = fields;

    if (memorySize !== undefined) {
      if (isNaN(Number(memorySize))) throw new Error(ResponseCode.E_004_001);
    }

    if (rotation !== undefined) {
      if (isNaN(Number(rotation))) throw new Error(ResponseCode.E_004_001);
    }
  }

  private isValidM2 (fields: any): void {
    const {
      memorySize,
      model
    } = fields;
    if (memorySize !== undefined) {
      if (isNaN(Number(memorySize))) throw new Error(ResponseCode.E_004_001);
    }
    if (model !== undefined) {
      if (isNaN(Number(model))) throw new Error(ResponseCode.E_004_001);
    }
  }

  private isPsu (fields: any): void {
    const { wattage } = fields;

    if (wattage !== undefined) {
      if (isNaN(Number(wattage))) throw new Error(ResponseCode.E_004_001);
    }
  }
}

export default new PartsHelper();
