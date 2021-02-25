import { getRepository } from 'typeorm';

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
}

export default new PartsHelper();
