import { config } from 'dotenv';
import { getConnection } from 'typeorm';
import startConnection from '../src/database/index';

import Mother from '../src/database/entity/mother.entity';
import M2Socket from '../src/database/entity/m2Socket.entity';
import M2SocketTypes from '../src/database/entity/m2SocketType.entity';
import PcieSocket from '../src/database/entity/PcieSocket.entity';
import Motherfrequency from '../src/database/entity/motherFrequency.entity';
import GridMother from '../src/database/entity/gridMother.entity';
import PieceGrid from '../src/database/entity/pieceGrid.entity';
import Cooler from '../src/database/entity/cooler.entity';
import CoolerCompatibility from '../src/database/entity/coolerCompatibility.entity';
import Cpu from '../src/database/entity/cpu.entity';
import CpuFrequency from '../src/database/entity/cpuFrequency.entity';
import Pcie from '../src/database/entity/pcie.entity';
import Psu from '../src/database/entity/psu.entity';
import M2 from '../src/database/entity/m2.entity';
import Rom from '../src/database/entity/rom.entity';
import Recorder from '../src/database/entity/recorder.entity';
import Ram from '../src/database/entity/ram.entity';

config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });

const motherFactory = (
  name: string,
  type: string,
  image: string,
  imageId: string,
  dropImage: string,
  dropImageId: string,
  socket: string,
  chipset: string,
  memorySlotAmount: number,
  memorySizeSupport: number,
  memorySlotType: string,
  TDP: number,
  hasSocketM2: boolean
): Mother => {
  const mother: Mother = new Mother();
  mother.name = name;
  mother.type = type;
  mother.image = image;
  mother.imageId = imageId;
  mother.dropImage = dropImage;
  mother.dropImageId = dropImageId;
  mother.socket = socket;
  mother.chipset = chipset;
  mother.memorySlotAmount = memorySlotAmount;
  mother.memorySizeSupport = memorySizeSupport;
  mother.memorySlotType = memorySlotType;
  mother.TDP = TDP;
  mother.hasSocketM2 = hasSocketM2;
  return mother;
};
const m2SocketFactory = (motherBoard: Mother): M2Socket => {
  const m2Socket: M2Socket = new M2Socket();
  m2Socket.mother = motherBoard;
  return m2Socket;
};
const m2SocketTypesFactory = (m2Socket: M2Socket): M2SocketTypes => {
  const m2SocketTypes: M2SocketTypes = new M2SocketTypes();
  m2SocketTypes.m2Socker = m2Socket;
  m2SocketTypes.type = 'NVMe';
  return m2SocketTypes;
};
const pcieSocketFactory = (motherBoard: Mother, type: string, version: number): PcieSocket => {
  const pcieSocket: PcieSocket = new PcieSocket();
  pcieSocket.mother = motherBoard;
  pcieSocket.type = type;
  pcieSocket.version = version;
  return pcieSocket;
};
const motherFrequencyFactory = (motherBoard: Mother, frequency: number): Motherfrequency => {
  const motherFrequency: Motherfrequency = new Motherfrequency();
  motherFrequency.mother = motherBoard;
  motherFrequency.frequency = frequency;
  return motherFrequency;
};
const gridMotherFactory = (mode: string, motherBoard: Mother): GridMother => {
  const gridMother: GridMother = new GridMother();
  gridMother.mode = mode;
  gridMother.mother = motherBoard;
  return gridMother;
};
const pieceGridFactory = (
  gridMother: GridMother,
  type: string,
  gridColumn: string,
  gridRow: string,
  div?: string
): PieceGrid => {
  const pieceGrid: PieceGrid = new PieceGrid();
  pieceGrid.gridMother = gridMother;
  pieceGrid.type = type;
  pieceGrid.gridColumn = gridColumn;
  pieceGrid.gridRow = gridRow;
  pieceGrid.div = div!;
  return pieceGrid;
};
const coolerFactory = (
  name: string,
  type: string,
  speedFan: number,
  fanAirflow: number,
  TDP: number,
  image: string,
  imageId: string,
  dropImage: string,
  dropImageId: string
): Cooler => {
  const cooler: Cooler = new Cooler();
  cooler.name = name;
  cooler.type = type;
  cooler.speedFan = speedFan;
  cooler.fanAirflow = fanAirflow;
  cooler.TDP = TDP;
  cooler.image = image;
  cooler.imageId = imageId;
  cooler.dropImage = dropImage;
  cooler.dropImageId = dropImageId;
  return cooler;
};
const coolerFrequencyFactory = (cooler: Cooler, compatibilityCpu: string): CoolerCompatibility => {
  const coolerFrequency: CoolerCompatibility = new CoolerCompatibility();
  coolerFrequency.cooler = cooler;
  coolerFrequency.compatibilityCpu = compatibilityCpu;
  return coolerFrequency;
};
const cpuFactory = (
  name: string,
  type: string,
  image: string,
  imageId: string,
  dropImage: string,
  dropImageId: string,
  socket: string,
  chipset: string,
  threads: number,
  core: number,
  baseClockSpeed: number,
  maximumBoostSpeed: number,
  cache: number,
  graphicsProcessor: string,
  memorySupportAmountSlot: number,
  memorySizeSupport: number,
  TDP: number
): Cpu => {
  const cpu: Cpu = new Cpu();
  cpu.name = name;
  cpu.type = type;
  cpu.image = image;
  cpu.imageId = imageId;
  cpu.dropImage = dropImage;
  cpu.dropImageId = dropImageId;
  cpu.socket = socket;
  cpu.chipset = chipset;
  cpu.threads = threads;
  cpu.core = core;
  cpu.baseClockSpeed = baseClockSpeed;
  cpu.maximumBoostSpeed = maximumBoostSpeed;
  cpu.cache = cache;
  cpu.graphicsProcessor = graphicsProcessor;
  cpu.memorySupportAmountSlot = memorySupportAmountSlot;
  cpu.memorySizeSupport = memorySizeSupport;
  cpu.TDP = TDP;
  return cpu;
};
const cpuFrequencyFactory = (cpu: Cpu, frequency: number): CpuFrequency => {
  const cpuFrequency: CpuFrequency = new CpuFrequency();
  cpuFrequency.cpu = cpu;
  cpuFrequency.frequency = frequency;
  return cpuFrequency;
};
const pcieFactory = (
  name: string,
  type: string,
  PCIeType: string,
  PCIeVersion: number,
  boostClock: number,
  baseClock: number,
  memoryType: string,
  memorySize: number,
  CUDACore: number,
  memorySpeed: string,
  memoryInterface: string,
  TDP: number,
  image: string,
  imageId: string,
  dropImage: string,
  dropImageId: string
): Pcie => {
  const pcie: Pcie = new Pcie();
  pcie.name = name;
  pcie.type = type;
  pcie.PCIeType = PCIeType;
  pcie.PCIeVersion = PCIeVersion;
  pcie.boostClock = boostClock;
  pcie.baseClock = baseClock;
  pcie.memoryType = memoryType;
  pcie.memorySize = memorySize;
  pcie.CUDACore = CUDACore;
  pcie.memorySpeed = memorySpeed;
  pcie.memoryInterface = memoryInterface;
  pcie.TDP = TDP;
  pcie.image = image;
  pcie.imageId = imageId;
  pcie.dropImage = dropImage;
  pcie.dropImageId = dropImageId;
  return pcie;
};
const psuFactory = (
  name: string,
  type: string,
  wattage: number,
  voltage: string,
  TDP: number,
  image: string,
  imageId: string,
  dropImage: string,
  dropImageId: string

): Psu => {
  const psu: Psu = new Psu();
  psu.name = name;
  psu.type = type;
  psu.wattage = wattage;
  psu.voltage = voltage;
  psu.TDP = TDP;
  psu.image = image;
  psu.imageId = imageId;
  psu.dropImage = dropImage;
  psu.dropImageId = dropImageId;
  return psu;
};
const m2Factory = (
  name: string,
  type: string,
  format: string,
  model: number,
  memorySize: number,
  TDP: number,
  reading: string,
  writing: string,
  image: string,
  imageId: string,
  dropImage: string,
  dropImageId: string
): M2 => {
  const m2: M2 = new M2();
  m2.name = name;
  m2.type = type;
  m2.format = format;
  m2.model = model;
  m2.memorySize = memorySize;
  m2.TDP = TDP;
  m2.reading = reading;
  m2.writing = writing;
  m2.image = image;
  m2.imageId = imageId;
  m2.dropImage = dropImage;
  m2.dropImageId = dropImageId;
  return m2;
};
const romFactory = (
  name: string,
  type: string,
  memorySize: number,
  TDP: number,
  reading: string,
  writing: string,
  image: string,
  imageId: string,
  dropImage: string,
  dropImageId: string,
  rotation?: number
): Rom => {
  const rom: Rom = new Rom();
  rom.name = name;
  rom.type = type;
  rom.memorySize = memorySize;
  rom.TDP = TDP;
  rom.reading = reading;
  rom.writing = writing;
  rom.image = image;
  rom.imageId = imageId;
  rom.dropImage = dropImage;
  rom.dropImageId = dropImageId;
  rom.rotation = rotation!;
  return rom;
};
const recorderFactory = (
  name: string,
  type: string,
  TDP: number,
  image: string,
  imageId: string,
  dropImage: string,
  dropImageId: string
): Recorder => {
  const recorder: Recorder = new Recorder();
  recorder.name = name;
  recorder.type = type;
  recorder.TDP = TDP;
  recorder.image = image;
  recorder.imageId = imageId;
  recorder.dropImage = dropImage;
  recorder.dropImageId = dropImageId;
  return recorder;
};
const ramFactory = (
  name: string,
  type: string,
  memorySlotType: string,
  memoryFrequency: number,
  memorySize: number,
  TDP: number,
  image: string,
  imageId: string,
  dropImage: string,
  dropImageId: string
): Ram => {
  const ram: Ram = new Ram();
  ram.name = name;
  ram.type = type;
  ram.memorySlotType = memorySlotType;
  ram.memoryFrequency = memoryFrequency;
  ram.memorySize = memorySize;
  ram.TDP = TDP;
  ram.image = image;
  ram.imageId = imageId;
  ram.dropImage = dropImage;
  ram.dropImageId = dropImageId;
  return ram;
};

async function Dump () {
  try {
    await startConnection();
    await getConnection().transaction(async transaction => {
      const motherPremium = await transaction.save(motherFactory(
        'motherBoard Premium',
        'motherBoard',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129009/DragAndDrop/motherBoard/mother1_iumte0.png',
        'mother1_iumte0',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129009/DragAndDrop/motherBoard/mother1_iumte0.png',
        'mother1_iumte0',
        'LGA1200',
        'H410 Express',
        2,
        64,
        'DDR4',
        125,
        true
      ));

      const m2Socker = await transaction.save(m2SocketFactory(motherPremium));
      await transaction.save(m2SocketTypesFactory(m2Socker));

      await transaction.save(pcieSocketFactory(motherPremium, 'x16', 3));
      await transaction.save(pcieSocketFactory(motherPremium, 'x16', 2));
      await transaction.save(pcieSocketFactory(motherPremium, 'x1', 2));

      await transaction.save(motherFrequencyFactory(motherPremium, 2933));
      await transaction.save(motherFrequencyFactory(motherPremium, 2666));
      await transaction.save(motherFrequencyFactory(motherPremium, 2400));
      await transaction.save(motherFrequencyFactory(motherPremium, 2133));

      const premiumModeMother = await transaction.save(gridMotherFactory('motherboard', motherPremium));
      const premiumModePC = await transaction.save(gridMotherFactory('pc', motherPremium));

      await transaction.save(pieceGridFactory(premiumModeMother, 'cpu', '88 / 113', '40 / 75'));
      await transaction.save(pieceGridFactory(premiumModeMother, 'cooler', '81 / 120', '28 / 86'));
      await transaction.save(pieceGridFactory(premiumModeMother, 'm2', '69 / 110', '132 / 151'));
      await transaction.save(pieceGridFactory(premiumModeMother, 'pciExpress1', '65 / 106', '184 / 191'));
      await transaction.save(pieceGridFactory(premiumModeMother, 'pciExpress1Docked', '41 / 150', '178 / 194'));
      await transaction.save(pieceGridFactory(premiumModeMother, 'ram', '133/137', '17/99', 'ram_1'));
      await transaction.save(pieceGridFactory(premiumModeMother, 'ram', '138 / 142', '17 / 99', 'ram_2'));
      await transaction.save(pieceGridFactory(premiumModeMother, 'ramDocked', '134 / 136', '15 / 100', 'ram_1'));
      await transaction.save(pieceGridFactory(premiumModeMother, 'ramDocked', '139 / 141', '15 / 100', 'ram_2'));

      await transaction.save(pieceGridFactory(premiumModePC, 'cpu', '71 / 108', '41 / 75'));
      await transaction.save(pieceGridFactory(premiumModePC, 'cooler', '61 / 119', '29 / 86'));
      await transaction.save(pieceGridFactory(premiumModePC, 'm2', '44/ 103', '132 / 149'));
      await transaction.save(pieceGridFactory(premiumModePC, 'pciExpress1', '37 / 99', '181 / 188'));
      await transaction.save(pieceGridFactory(premiumModePC, 'pciExpress1Docked', '1 / 165', '177 / 190'));
      await transaction.save(pieceGridFactory(premiumModePC, 'ram', '140 / 145', '18 / 100', 'ram_1'));
      await transaction.save(pieceGridFactory(premiumModePC, 'ram', '147 / 152', '19 / 98', 'ram_2'));
      await transaction.save(pieceGridFactory(premiumModePC, 'ramDocked', '141 / 144', '18 / 100', 'ram_1'));
      await transaction.save(pieceGridFactory(premiumModePC, 'ramDocked', '148 / 151', '18 / 100', 'ram_2'));

      const motherSimple = await transaction.save(motherFactory(
        'motherBoard Simple',
        'motherBoard',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129009/DragAndDrop/motherBoard/mother2_snt4ra.png',
        'mother2_snt4ra',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129009/DragAndDrop/motherBoard/mother2_snt4ra.png',
        'mother2_snt4ra',
        'LGA1150',
        'Z87 Express',
        2,
        32,
        'DDR3',
        60,
        false
      ));

      await transaction.save(pcieSocketFactory(motherSimple, 'x16', 3));
      await transaction.save(pcieSocketFactory(motherSimple, 'x16', 2));
      await transaction.save(pcieSocketFactory(motherSimple, 'x1', 2));

      await transaction.save(motherFrequencyFactory(motherSimple, 1600));
      await transaction.save(motherFrequencyFactory(motherSimple, 2333));

      const simpleModeMother = await transaction.save(gridMotherFactory('motherboard', motherSimple));
      const simpleModePC = await transaction.save(gridMotherFactory('pc', motherSimple));

      await transaction.save(pieceGridFactory(simpleModeMother, 'cpu', '88 / 113', '40 / 75'));
      await transaction.save(pieceGridFactory(simpleModeMother, 'cooler', '81 / 120', '28 / 86'));
      await transaction.save(pieceGridFactory(simpleModeMother, 'pciExpress1', '65 / 106', '184 / 191'));
      await transaction.save(pieceGridFactory(simpleModeMother, 'pciExpress1Docked', '41 / 150', '178 / 194'));
      await transaction.save(pieceGridFactory(simpleModeMother, 'ram', '133/137', '17/99', 'ram_1'));
      await transaction.save(pieceGridFactory(simpleModeMother, 'ram', '138 / 142', '17 / 99', 'ram_2'));
      await transaction.save(pieceGridFactory(simpleModeMother, 'ramDocked', '134 / 136', '15 / 100', 'ram_1'));
      await transaction.save(pieceGridFactory(simpleModeMother, 'ramDocked', '139 / 141', '15 / 100', 'ram_2'));

      await transaction.save(pieceGridFactory(simpleModePC, 'cpu', '71 / 108', '41 / 75'));
      await transaction.save(pieceGridFactory(simpleModePC, 'cooler', '61 / 119', '29 / 86'));
      await transaction.save(pieceGridFactory(simpleModePC, 'pciExpress1', '37 / 99', '181 / 188'));
      await transaction.save(pieceGridFactory(simpleModePC, 'pciExpress1Docked', '1 / 165', '177 / 190'));
      await transaction.save(pieceGridFactory(simpleModePC, 'ram', '140 / 145', '18 / 100', 'ram_1'));
      await transaction.save(pieceGridFactory(simpleModePC, 'ram', '147 / 152', '19 / 98', 'ram_2'));
      await transaction.save(pieceGridFactory(simpleModePC, 'ramDocked', '141 / 144', '18 / 100', 'ram_1'));
      await transaction.save(pieceGridFactory(simpleModePC, 'ramDocked', '148 / 151', '18 / 100', 'ram_2'));

      const coolerPremium = await transaction.save(coolerFactory(
        'Cooler Premium',
        'cooler',
        2200,
        42,
        35,
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614128996/DragAndDrop/cooler/cooler_dqjvtl.png',
        'cooler_dqjvtl',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614128996/DragAndDrop/cooler/cooler_dqjvtl.png',
        'cooler_dqjvtl'
      ));
      await transaction.save(coolerFrequencyFactory(coolerPremium, 'LGA1200'));

      const coolerSimple = await transaction.save(coolerFactory(
        'Cooler Simple',
        'cooler',
        2000,
        35,
        65,
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614128996/DragAndDrop/cooler/cooler_dqjvtl.png',
        'cooler_dqjvtl',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614128996/DragAndDrop/cooler/cooler_dqjvtl.png',
        'cooler_dqjvtl'
      ));
      await transaction.save(coolerFrequencyFactory(coolerSimple, 'LGA1150'));
      await transaction.save(coolerFrequencyFactory(coolerSimple, 'LGA1151'));

      const cpuPremium = await transaction.save(cpuFactory(
        'Cpu Premium',
        'cpu',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129003/DragAndDrop/cpu/cpu1_qetftx.png',
        'cpu1_qetftx',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129003/DragAndDrop/cpu/cpu1_qetftx.png',
        'cpu1_qetftx',
        'LGA1200',
        'H410 Express',
        12,
        6,
        2.90,
        4.30,
        12,
        'Intel UHD Graphics 630',
        2,
        64,
        65
      ));
      await transaction.save(cpuFrequencyFactory(cpuPremium, 2933));
      await transaction.save(cpuFrequencyFactory(cpuPremium, 266));
      await transaction.save(cpuFrequencyFactory(cpuPremium, 2400));
      await transaction.save(cpuFrequencyFactory(cpuPremium, 2133));

      const cpuSimple = await transaction.save(cpuFactory(
        'Cpu Simple',
        'cpu',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129003/DragAndDrop/cpu/cpu1_qetftx.png',
        'cpu1_qetftx',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129003/DragAndDrop/cpu/cpu1_qetftx.png',
        'cpu1_qetftx',
        'LGA1150',
        'Z87 Express',
        4,
        2,
        3.20,
        3.20,
        3,
        'Intel HD Graphics 4400',
        2,
        32,
        35
      ));
      await transaction.save(cpuFrequencyFactory(cpuSimple, 1600));
      await transaction.save(cpuFrequencyFactory(cpuSimple, 1333));

      await transaction.save(pcieFactory(
        'Placa de Vídeo',
        'pciExpress',
        'x16',
        3,
        1755,
        1410,
        'GDDR6',
        4,
        896,
        '12 Gbps',
        '128 bits',
        100,
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129013/DragAndDrop/pciExpress/grapichCard_kegkgf.png',
        'grapichCard_kegkgf',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129013/DragAndDrop/pciExpress/grapichCardDrop_uzvtjo.png',
        'grapichCardDrop_uzvtjo'
      ));

      await transaction.save(psuFactory(
        'Fonte 200W',
        'powerSupply',
        200,
        'Bivolt',
        0,
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129016/DragAndDrop/powerSupply/powerSupply_izjyph.png',
        'powerSupply_izjyph',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129016/DragAndDrop/powerSupply/powerSupplyLateral_qmp3ia.png',
        'powerSupplyLateral_qmp3ia'
      ));

      await transaction.save(psuFactory(
        'Fonte 400W',
        'powerSupply',
        400,
        'Bivolt',
        0,
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129016/DragAndDrop/powerSupply/powerSupply_izjyph.png',
        'powerSupply_izjyph',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129016/DragAndDrop/powerSupply/powerSupplyLateral_qmp3ia.png',
        'powerSupplyLateral_qmp3ia'
      ));

      await transaction.save(m2Factory(
        'M.2 NVMe',
        'm2',
        'NVMe',
        2280,
        0.250,
        2,
        '2000 MB/s',
        '1100 MB/s',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129026/DragAndDrop/rom/M2_jiaxtx.png',
        'M2_jiaxtx',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129026/DragAndDrop/rom/M2Encaixe_dtxx5q.png',
        'M2Encaixe_dtxx5q'
      ));

      await transaction.save(romFactory(
        'HD',
        'rom',
        1,
        5,
        '120 MB/s',
        '50 MB/s',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129026/DragAndDrop/rom/hdd_lynn8h.png',
        'hdd_lynn8h',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129026/DragAndDrop/rom/hddLateral_hlxsby.png',
        'hddLateral_hlxsby',
        5900
      ));

      await transaction.save(romFactory(
        'SSD SATA',
        'rom',
        0.520,
        2,
        '550 MB/s',
        '445 MB/s',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129026/DragAndDrop/rom/ssd_g2ei2d.png',
        'ssd_g2ei2d',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129026/DragAndDrop/rom/ssdLateral_nxgcnr.png',
        'ssdLateral_nxgcnr'
      ));

      await transaction.save(recorderFactory(
        'Leitor de DVD',
        'recorder',
        20,
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129026/DragAndDrop/recorder/recorder_dcvehc.png',
        'recorder_dcvehc',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129026/DragAndDrop/recorder/recorderDrop_iggo3r.png',
        'recorderDrop_iggo3r'
      ));

      await transaction.save(ramFactory(
        'Memória DDR4',
        'ram',
        'DDR4',
        2400,
        8,
        2,
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129023/DragAndDrop/ram/ram1_leolkv.png',
        'ram2drop_lphsls',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129023/DragAndDrop/ram/ram1drop_ncwrga.png',
        'ram1drop_ncwrga'
      ));

      await transaction.save(ramFactory(
        'Memória DDR4',
        'ram',
        'DDR4',
        3000,
        8,
        2,
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129023/DragAndDrop/ram/ram1_leolkv.png',
        'ram2drop_lphsls',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129023/DragAndDrop/ram/ram1drop_ncwrga.png',
        'ram1drop_ncwrga'
      ));

      await transaction.save(ramFactory(
        'Memória DDR3',
        'ram',
        'DDR3',
        1600,
        8,
        2,
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129024/DragAndDrop/ram/ram2_a0x5nt.png',
        'ram2_a0x5nt',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129023/DragAndDrop/ram/ram2drop_lphsls.png',
        'ram2drop_lphsls'
      ));

      await transaction.save(ramFactory(
        'Memória DDR3',
        'ram',
        'DDR3',
        1866,
        8,
        2,
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129024/DragAndDrop/ram/ram2_a0x5nt.png',
        'ram2_a0x5nt',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129023/DragAndDrop/ram/ram2drop_lphsls.png',
        'ram2drop_lphsls'
      ));
    });
  } catch (err) {
    console.log(err);
  } finally {
    process.exit();
  }
}

Dump();
