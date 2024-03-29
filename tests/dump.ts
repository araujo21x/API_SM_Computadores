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
import FilterQuestions from '../src/database/entity/filterQuestions.entity';
import FilterResponse from '../src/database/entity/filterResponse.entity';

config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });
const filterQuestionsFactory = (
  name: string,
  question: string,
  answerDB: boolean,
  typePart:string
): FilterQuestions => {
  const questions: FilterQuestions = new FilterQuestions();
  questions.name = name;
  questions.question = question;
  questions.answerDB = answerDB;
  questions.typePart = typePart;
  return questions;
};

const filterResponseFactory = (
  filterQuestions: FilterQuestions,
  value: string,
  text: string
): FilterResponse => {
  const response: FilterResponse = new FilterResponse();
  response.filterQuestions = filterQuestions;
  response.value = value;
  response.text = text;
  return response;
};

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
      // motherboard filter
      const orderMotherboard = await transaction.save(filterQuestionsFactory(
        'order',
        'Ordenar por',
        true,
        'motherBoard'
      ));
      await transaction.save(filterResponseFactory(
        orderMotherboard,
        'chipset',
        'Chipset'
      ));
      await transaction.save(filterResponseFactory(
        orderMotherboard,
        'socket',
        'Socket'
      ));
      await transaction.save(filterResponseFactory(
        orderMotherboard,
        'memorySizeSupport',
        'Limite máximo de Ram'
      ));
      await transaction.save(filterResponseFactory(
        orderMotherboard,
        'memorySlotAmount',
        'Limite de slots de memória'
      ));
      await transaction.save(filterResponseFactory(
        orderMotherboard,
        'memorySlotType',
        'Tipo de slot de memória'
      ));
      await transaction.save(filterResponseFactory(
        orderMotherboard,
        'motherFrequencies',
        'Frequências de memória'
      ));

      const sortMotherboard = await transaction.save(filterQuestionsFactory(
        'sortType',
        'Ordenar de maneira',
        true,
        'motherBoard'
      ));
      await transaction.save(filterResponseFactory(
        sortMotherboard,
        'ASC',
        'Crescente'
      ));
      await transaction.save(filterResponseFactory(
        sortMotherboard,
        'DESC',
        'Decrescente'
      ));

      const showPieceMotherboard = await transaction.save(filterQuestionsFactory(
        'showPieces',
        'Mostrar Peças',
        true,
        'motherBoard'
      ));
      await transaction.save(filterResponseFactory(
        showPieceMotherboard,
        'pluggable',
        'Encaixáveis'
      ));
      await transaction.save(filterResponseFactory(
        showPieceMotherboard,
        'notPluggable',
        'Não Encaixáveis'
      ));

      await transaction.save(filterQuestionsFactory(
        'chipset',
        'Selecione um chipset',
        false,
        'motherBoard'
      ));
      await transaction.save(filterQuestionsFactory(
        'socket',
        'Selecione um socket',
        false,
        'motherBoard'
      ));

      const suporteM2Motherboard = await transaction.save(filterQuestionsFactory(
        'suportM2',
        'suporte a entrada M2',
        true,
        'motherBoard'
      ));
      await transaction.save(filterResponseFactory(
        suporteM2Motherboard,
        'true',
        'Possui'
      ));
      await transaction.save(filterResponseFactory(
        suporteM2Motherboard,
        'false',
        'Não possui'
      ));

      await transaction.save(filterQuestionsFactory(
        'memorySizeSupport',
        'Limite máximo de Ram',
        false,
        'motherBoard'
      ));

      const memorySlotAmountMotherboard = await transaction.save(filterQuestionsFactory(
        'memorySlotAmount',
        'Limite de slots de memória',
        true,
        'motherBoard'
      ));
      await transaction.save(filterResponseFactory(
        memorySlotAmountMotherboard,
        '1',
        '1'
      ));
      await transaction.save(filterResponseFactory(
        memorySlotAmountMotherboard,
        '2',
        '2'
      ));
      await transaction.save(filterResponseFactory(
        memorySlotAmountMotherboard,
        '3',
        '3'
      ));
      await transaction.save(filterResponseFactory(
        memorySlotAmountMotherboard,
        '4',
        '4'
      ));

      const memorySlotTypeMotherboard = await transaction.save(filterQuestionsFactory(
        'memorySlotType',
        'Tipo de slot de memória',
        true,
        'motherBoard'
      ));
      await transaction.save(filterResponseFactory(
        memorySlotTypeMotherboard,
        'DDR3',
        'DDR3'
      ));
      await transaction.save(filterResponseFactory(
        memorySlotTypeMotherboard,
        'DDR4',
        'DDR4'
      ));
      await transaction.save(filterQuestionsFactory(
        'motherFrequencies',
        'Frequências de memória suportadas',
        false,
        'motherBoard'
      ));

      // cpu filter
      const orderCPU = await transaction.save(filterQuestionsFactory(
        'order',
        'Ordenar por',
        true,
        'cpu'
      ));
      await transaction.save(filterResponseFactory(
        orderCPU,
        'name',
        'Nome'
      ));
      await transaction.save(filterResponseFactory(
        orderCPU,
        'chipset',
        'Chipset'
      ));
      await transaction.save(filterResponseFactory(
        orderCPU,
        'socket',
        'Socket'
      ));
      await transaction.save(filterResponseFactory(
        orderCPU,
        'memorySizeSupport',
        'Limite máximo de Ram'
      ));
      await transaction.save(filterResponseFactory(
        orderCPU,
        'memorySupportAmountSlot',
        'Limite de slots de memória'
      ));
      await transaction.save(filterResponseFactory(
        orderCPU,
        'cpuFrequencies',
        'Frequências de memória'
      ));
      await transaction.save(filterResponseFactory(
        orderCPU,
        'baseClockSpeed',
        'Frequência mínima de clock'
      ));
      await transaction.save(filterResponseFactory(
        orderCPU,
        'maximumBoostSpeed',
        'Frequência máxima de clock'
      ));
      await transaction.save(filterResponseFactory(
        orderCPU,
        'cache',
        'Cache'
      ));
      await transaction.save(filterResponseFactory(
        orderCPU,
        'core',
        'Core'
      ));
      await transaction.save(filterResponseFactory(
        orderCPU,
        'threads',
        'Threads'
      ));
      await transaction.save(filterResponseFactory(
        orderCPU,
        'graphicsProcessor',
        'Placa gráfica integrada'
      ));

      const sortCPU = await transaction.save(filterQuestionsFactory(
        'sortType',
        'Ordenar de maneira',
        true,
        'cpu'
      ));
      await transaction.save(filterResponseFactory(
        sortCPU,
        'ASC',
        'Crescente'
      ));
      await transaction.save(filterResponseFactory(
        sortCPU,
        'DESC',
        'Decrescente'
      ));

      const showPiecesCPU = await transaction.save(filterQuestionsFactory(
        'showPieces',
        'Mostrar Peças',
        true,
        'cpu'
      ));
      await transaction.save(filterResponseFactory(
        showPiecesCPU,
        'pluggable',
        'Encaixáveis'
      ));
      await transaction.save(filterResponseFactory(
        showPiecesCPU,
        'notPluggable',
        'Não Encaixáveis'
      ));

      await transaction.save(filterQuestionsFactory(
        'chipset',
        'Selecione um chipset',
        false,
        'cpu'
      ));

      await transaction.save(filterQuestionsFactory(
        'socket',
        'Selecione um socket',
        false,
        'cpu'
      ));

      await transaction.save(filterQuestionsFactory(
        'memorySizeSupport',
        'Limite máximo de Ram',
        false,
        'cpu'
      ));

      const memorySlotAmountCPU = await transaction.save(filterQuestionsFactory(
        'memorySlotAmount',
        'Limite de slots de memória',
        true,
        'cpu'
      ));
      await transaction.save(filterResponseFactory(
        memorySlotAmountCPU,
        '1',
        '1'
      ));
      await transaction.save(filterResponseFactory(
        memorySlotAmountCPU,
        '2',
        '2'
      ));
      await transaction.save(filterResponseFactory(
        memorySlotAmountCPU,
        '3',
        '3'
      ));
      await transaction.save(filterResponseFactory(
        memorySlotAmountCPU,
        '4',
        '4'
      ));

      await transaction.save(filterQuestionsFactory(
        'cpuFrequencies',
        'Frequências de memória suportadas',
        false,
        'cpu'
      ));

      await transaction.save(filterQuestionsFactory(
        'maximumBoostSpeed',
        'Frequência máxima de clock',
        false,
        'cpu'
      ));

      await transaction.save(filterQuestionsFactory(
        'baseClockSpeed',
        'Frequência mínima de clock',
        false,
        'cpu'
      ));

      await transaction.save(filterQuestionsFactory(
        'cache',
        'Selecione tamanho do cache',
        false,
        'cpu'
      ));

      await transaction.save(filterQuestionsFactory(
        'core',
        'Quantidade de núcleos',
        false,
        'cpu'
      ));
      await transaction.save(filterQuestionsFactory(
        'threads',
        'Quantidade de threads',
        false,
        'cpu'
      ));
      await transaction.save(filterQuestionsFactory(
        'grapshicProcessor',
        'Placa gráfica integrada',
        false,
        'cpu'
      ));

      // cooler
      const orderCooler = await transaction.save(filterQuestionsFactory(
        'order',
        'Ordenar por',
        true,
        'cooler'
      ));
      await transaction.save(filterResponseFactory(
        orderCooler,
        'name',
        'Nome'
      ));
      await transaction.save(filterResponseFactory(
        orderCooler,
        'compatibilityCpu',
        'Selecione um socket'
      ));
      await transaction.save(filterResponseFactory(
        orderCooler,
        'speedFan',
        'Velocidade do Fan'
      ));
      await transaction.save(filterResponseFactory(
        orderCooler,
        'fanAirflow',
        'Máximo fluxo de ar do fan'
      ));

      const sortCooler = await transaction.save(filterQuestionsFactory(
        'sortType',
        'Ordenar de maneira',
        true,
        'cooler'
      ));
      await transaction.save(filterResponseFactory(
        sortCooler,
        'ASC',
        'Crescente'
      ));
      await transaction.save(filterResponseFactory(
        sortCooler,
        'DESC',
        'Decrescente'
      ));

      const showPiecesCooler = await transaction.save(filterQuestionsFactory(
        'showPieces',
        'Mostrar Peças',
        true,
        'cooler'
      ));
      await transaction.save(filterResponseFactory(
        showPiecesCooler,
        'pluggable',
        'Encaixáveis'
      ));
      await transaction.save(filterResponseFactory(
        showPiecesCooler,
        'notPluggable',
        'Não Encaixáveis'
      ));

      await transaction.save(filterQuestionsFactory(
        'compatibilityCpu',
        'Selecione um socket',
        false,
        'cooler'
      ));

      await transaction.save(filterQuestionsFactory(
        'speedFan',
        'Velocidade do Fan',
        false,
        'cooler'
      ));

      await transaction.save(filterQuestionsFactory(
        'fanAirflow',
        'Máximo fluxo de ar do fan',
        false,
        'cooler'
      ));

      const orderRam = await transaction.save(filterQuestionsFactory(
        'order',
        'Ordenar por',
        true,
        'ram'
      ));
      await transaction.save(filterResponseFactory(
        orderRam,
        'name',
        'Nome'
      ));
      await transaction.save(filterResponseFactory(
        orderRam,
        'memoryFrequency',
        'Frequência da Memória'
      ));
      await transaction.save(filterResponseFactory(
        orderRam,
        'memorySize',
        'Tamanho de memória'
      ));
      await transaction.save(filterResponseFactory(
        orderRam,
        'memorySlotType',
        'Tipo de slot'
      ));

      const sortRam = await transaction.save(filterQuestionsFactory(
        'sortType',
        'Ordenar de maneira',
        true,
        'ram'
      ));
      await transaction.save(filterResponseFactory(
        sortRam,
        'ASC',
        'Crescente'
      ));
      await transaction.save(filterResponseFactory(
        sortRam,
        'DESC',
        'Decrescente'
      ));

      const showPiecesRam = await transaction.save(filterQuestionsFactory(
        'showPieces',
        'Mostrar Peças',
        true,
        'ram'
      ));
      await transaction.save(filterResponseFactory(
        showPiecesRam,
        'pluggable',
        'Encaixáveis'
      ));
      await transaction.save(filterResponseFactory(
        showPiecesRam,
        'notPluggable',
        'Não Encaixáveis'
      ));

      await transaction.save(filterQuestionsFactory(
        'memoryFrequency',
        'Frequência da Memória',
        false,
        'ram'
      ));

      const memorySizeRam = await transaction.save(filterQuestionsFactory(
        'memorySize',
        'Tamanho de memória',
        true,
        'ram'
      ));
      await transaction.save(filterResponseFactory(
        memorySizeRam,
        '8',
        '8 GB'
      ));

      const memorySlotTypeRam = await transaction.save(filterQuestionsFactory(
        'memorySlotType',
        'Tipo de slot',
        true,
        'ram'
      ));
      await transaction.save(filterResponseFactory(
        memorySlotTypeRam,
        'DDR3',
        'DDR3'
      ));
      await transaction.save(filterResponseFactory(
        memorySlotTypeRam,
        'DDR4',
        'DDR4'
      ));

      // PCIe
      const orderPCIe = await transaction.save(filterQuestionsFactory(
        'order',
        'Ordenar por',
        true,
        'pciExpress'
      ));
      await transaction.save(filterResponseFactory(
        orderPCIe,
        'name',
        'Nome'
      ));
      await transaction.save(filterResponseFactory(
        orderPCIe,
        'baseClock',
        'Base clock'
      ));
      await transaction.save(filterResponseFactory(
        orderPCIe,
        'boostClock',
        'Boost clock'
      ));
      await transaction.save(filterResponseFactory(
        orderPCIe,
        'CUDACore',
        'CUDACore'
      ));
      await transaction.save(filterResponseFactory(
        orderPCIe,
        'memoryInterface',
        'Interface de memória'
      ));
      await transaction.save(filterResponseFactory(
        orderPCIe,
        'memorySize',
        'Tamanho de memória'
      ));
      await transaction.save(filterResponseFactory(
        orderPCIe,
        'memorySpeed',
        'Velocidade de memória'
      ));
      await transaction.save(filterResponseFactory(
        orderPCIe,
        'memoryType',
        'Tipo de memória'
      ));

      const sortPCIe = await transaction.save(filterQuestionsFactory(
        'sortType',
        'Ordenar de maneira',
        true,
        'pciExpress'
      ));
      await transaction.save(filterResponseFactory(
        sortPCIe,
        'ASC',
        'Crescente'
      ));
      await transaction.save(filterResponseFactory(
        sortPCIe,
        'DESC',
        'Decrescente'
      ));

      const showPiecesPCIe = await transaction.save(filterQuestionsFactory(
        'showPieces',
        'Mostrar Peças',
        true,
        'pciExpress'
      ));
      await transaction.save(filterResponseFactory(
        showPiecesPCIe,
        'pluggable',
        'Encaixáveis'
      ));
      await transaction.save(filterResponseFactory(
        showPiecesPCIe,
        'notPluggable',
        'Não Encaixáveis'
      ));

      await transaction.save(filterQuestionsFactory(
        'baseClock',
        'GPU base clock',
        false,
        'pciExpress'
      ));

      await transaction.save(filterQuestionsFactory(
        'boostClock',
        'GPU boost clock',
        false,
        'pciExpress'
      ));

      await transaction.save(filterQuestionsFactory(
        'CUDACore',
        'CUDA core',
        false,
        'pciExpress'
      ));

      await transaction.save(filterQuestionsFactory(
        'memoryInterface',
        'Interface de memória',
        false,
        'pciExpress'
      ));

      await transaction.save(filterQuestionsFactory(
        'memorySize',
        'Tamanho de memória',
        false,
        'pciExpress'
      ));

      await transaction.save(filterQuestionsFactory(
        'memorySpeed',
        'Velocidade de memória',
        false,
        'pciExpress'
      ));

      const memoryTypePCIe = await transaction.save(filterQuestionsFactory(
        'memoryType',
        'Tipo de memória',
        true,
        'pciExpress'
      ));
      await transaction.save(filterResponseFactory(
        memoryTypePCIe,
        'GDDR6',
        'GDDR6'
      ));

      const orderRom = await transaction.save(filterQuestionsFactory(
        'order',
        'Ordenar por',
        true,
        'rom'
      ));
      await transaction.save(filterResponseFactory(
        orderRom,
        'name',
        'Nome'
      ));
      await transaction.save(filterResponseFactory(
        orderRom,
        'memorySize',
        'Tamanho da memória'
      ));
      await transaction.save(filterResponseFactory(
        orderRom,
        'reading',
        'Velocidade de leitura'
      ));
      await transaction.save(filterResponseFactory(
        orderRom,
        'writing',
        'Velocidade de escrita'
      ));
      await transaction.save(filterResponseFactory(
        orderRom,
        'rotation',
        'Rotação(para HDD)'
      ));

      const sortTypeRom = await transaction.save(filterQuestionsFactory(
        'sortType',
        'Ordenar de maneira',
        true,
        'rom'
      ));
      await transaction.save(filterResponseFactory(
        sortTypeRom,
        'ASC',
        'Crescente'
      ));
      await transaction.save(filterResponseFactory(
        sortTypeRom,
        'DESC',
        'Decrescente'
      ));

      const showPiecesRom = await transaction.save(filterQuestionsFactory(
        'showPieces',
        'Mostrar Peças',
        true,
        'rom'
      ));
      await transaction.save(filterResponseFactory(
        showPiecesRom,
        'pluggable',
        'Encaixáveis'
      ));
      await transaction.save(filterResponseFactory(
        showPiecesRom,
        'notPluggable',
        'Não Encaixáveis'
      ));

      const memorySizeRom = await transaction.save(filterQuestionsFactory(
        'memorySize',
        'Tamanho da memória',
        true,
        'rom'
      ));
      await transaction.save(filterResponseFactory(
        memorySizeRom,
        '0.520',
        '0.520 GB'
      ));
      await transaction.save(filterResponseFactory(
        memorySizeRom,
        '1',
        '1 GB'
      ));

      await transaction.save(filterQuestionsFactory(
        'reading',
        'Velocidade de leitura',
        false,
        'rom'
      ));

      await transaction.save(filterQuestionsFactory(
        'writing',
        'Velocidade de escrita',
        false,
        'rom'
      ));

      await transaction.save(filterQuestionsFactory(
        'rotation',
        'Rotação(para HDD)',
        false,
        'rom'
      ));

      const orderM2 = await transaction.save(filterQuestionsFactory(
        'order',
        'Ordenar por',
        true,
        'm2'
      ));
      await transaction.save(filterResponseFactory(
        orderM2,
        'name',
        'Nome'
      ));
      await transaction.save(filterResponseFactory(
        orderM2,
        'format',
        'Interface'
      ));
      await transaction.save(filterResponseFactory(
        orderM2,
        'memorySize',
        'Tamanho de memória'
      ));
      await transaction.save(filterResponseFactory(
        orderM2,
        'model',
        'Formato'
      ));
      await transaction.save(filterResponseFactory(
        orderM2,
        'reading',
        'Velocidade de leitura'
      ));
      await transaction.save(filterResponseFactory(
        orderM2,
        'writing',
        'Velocidade de escrita'
      ));

      const sortTypeM2 = await transaction.save(filterQuestionsFactory(
        'sortType',
        'Ordenar de maneira',
        true,
        'm2'
      ));
      await transaction.save(filterResponseFactory(
        sortTypeM2,
        'ASC',
        'Crescente'
      ));
      await transaction.save(filterResponseFactory(
        sortTypeM2,
        'DESC',
        'Decrescente'
      ));

      const showPiecesM2 = await transaction.save(filterQuestionsFactory(
        'showPieces',
        'Mostrar Peças',
        true,
        'm2'
      ));
      await transaction.save(filterResponseFactory(
        showPiecesM2,
        'pluggable',
        'Encaixáveis'
      ));
      await transaction.save(filterResponseFactory(
        showPiecesM2,
        'notPluggable',
        'Não Encaixáveis'
      ));

      const formatM2 = await transaction.save(filterQuestionsFactory(
        'format',
        'Interface',
        true,
        'm2'
      ));
      await transaction.save(filterResponseFactory(
        formatM2,
        'NVMe',
        'NVMe'
      ));

      const memorySizeM2 = await transaction.save(filterQuestionsFactory(
        'memorySize',
        'Tamanho de memória',
        true,
        'm2'
      ));
      await transaction.save(filterResponseFactory(
        memorySizeM2,
        '0.250',
        '0.250 GB'
      ));

      const modelM2 = await transaction.save(filterQuestionsFactory(
        'model',
        'Formato',
        true,
        'm2'
      ));
      await transaction.save(filterResponseFactory(
        modelM2,
        '2280',
        '2280'
      ));

      await transaction.save(filterQuestionsFactory(
        'reading',
        'Velocidade de leitura',
        false,
        'm2'
      ));

      await transaction.save(filterQuestionsFactory(
        'writing',
        'Velocidade de escrita',
        false,
        'm2'
      ));

      const orderPowerSupply = await transaction.save(filterQuestionsFactory(
        'order',
        'Ordenar por',
        true,
        'powerSupply'
      ));
      await transaction.save(filterResponseFactory(
        orderPowerSupply,
        'name',
        'Nome'
      ));
      await transaction.save(filterResponseFactory(
        orderPowerSupply,
        'voltage',
        'Voltagem'
      ));
      await transaction.save(filterResponseFactory(
        orderPowerSupply,
        'wattage',
        'Potência'
      ));

      const sortTypeSupply = await transaction.save(filterQuestionsFactory(
        'sortType',
        'Ordenar de maneira',
        true,
        'powerSupply'
      ));
      await transaction.save(filterResponseFactory(
        sortTypeSupply,
        'ASC',
        'Crescente'
      ));
      await transaction.save(filterResponseFactory(
        sortTypeSupply,
        'DESC',
        'Decrescente'
      ));

      const showPiecesSupply = await transaction.save(filterQuestionsFactory(
        'showPieces',
        'Mostrar Peças',
        true,
        'powerSupply'
      ));
      await transaction.save(filterResponseFactory(
        showPiecesSupply,
        'pluggable',
        'Encaixáveis'
      ));
      await transaction.save(filterResponseFactory(
        showPiecesSupply,
        'notPluggable',
        'Não Encaixáveis'
      ));

      const voltageSupply = await transaction.save(filterQuestionsFactory(
        'voltage',
        'Voltagem',
        true,
        'powerSupply'
      ));
      await transaction.save(filterResponseFactory(
        voltageSupply,
        'Bivolt',
        'Bivolt'
      ));

      const wattageSupply = await transaction.save(filterQuestionsFactory(
        'wattage',
        'Capacidade de saída',
        true,
        'powerSupply'
      ));
      await transaction.save(filterResponseFactory(
        wattageSupply,
        '200',
        '200 W'
      ));
      await transaction.save(filterResponseFactory(
        wattageSupply,
        '400',
        '400 W'
      ));
      const motherPremium = await transaction.save(motherFactory(
        'motherBoard Premium',
        'motherBoard',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1625162662/DragAndDrop/motherBoard/PMAE_CINZA_4_RAM-02-01_d7gspm.png',
        'mother1_iumte0',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1625162662/DragAndDrop/motherBoard/PMAE_CINZA_4_RAM-02-01_d7gspm.png',
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

      await transaction.save(pieceGridFactory(premiumModeMother, 'cpu', '87 / 113', '39 / 75'));
      await transaction.save(pieceGridFactory(premiumModeMother, 'cooler', '80 / 121', '29 / 85'));
      await transaction.save(pieceGridFactory(premiumModeMother, 'm2', '69 / 110', '132 / 151'));
      await transaction.save(pieceGridFactory(premiumModeMother, 'pciExpress1', '65 / 106', '184 / 191'));
      await transaction.save(pieceGridFactory(premiumModeMother, 'pciExpress1Docked', '41 / 150', '178 / 194'));
      await transaction.save(pieceGridFactory(premiumModeMother, 'ram', '133/137', '17/99', 'ram_1'));
      await transaction.save(pieceGridFactory(premiumModeMother, 'ram', '138 / 142', '17 / 99', 'ram_2'));
      await transaction.save(pieceGridFactory(premiumModeMother, 'ramDocked', '134 / 136', '15 / 100', 'ram_1'));
      await transaction.save(pieceGridFactory(premiumModeMother, 'ramDocked', '139 / 141', '15 / 100', 'ram_2'));

      await transaction.save(pieceGridFactory(premiumModePC, 'cpu', '63 / 97', '39 / 75'));
      await transaction.save(pieceGridFactory(premiumModePC, 'cooler', '51 / 107', '27 / 85'));
      await transaction.save(pieceGridFactory(premiumModePC, 'm2', '37/ 85', '133 / 150'));
      await transaction.save(pieceGridFactory(premiumModePC, 'pciExpress1', '32 / 89', '184 / 190'));
      await transaction.save(pieceGridFactory(premiumModePC, 'pciExpress1Docked', '1 / 145', '177 / 190'));
      await transaction.save(pieceGridFactory(premiumModePC, 'ram', '123 / 129', '17 / 97', 'ram_1'));
      await transaction.save(pieceGridFactory(premiumModePC, 'ram', '130 / 136', '17 / 97', 'ram_2'));
      await transaction.save(pieceGridFactory(premiumModePC, 'ramDocked', '125 / 127', '15 / 100', 'ram_1'));
      await transaction.save(pieceGridFactory(premiumModePC, 'ramDocked', '132 / 134', '15 / 100', 'ram_2'));

      const motherSimple = await transaction.save(motherFactory(
        'motherBoard Simple',
        'motherBoard',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1625162662/DragAndDrop/motherBoard/PMAE_VERDE_4_RAM-01-02_p8cesj.png',
        'mother2_snt4ra',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1625162662/DragAndDrop/motherBoard/PMAE_VERDE_4_RAM-01-02_p8cesj.png',
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

      await transaction.save(pieceGridFactory(simpleModePC, 'cpu', '63 / 97', '39 / 75'));
      await transaction.save(pieceGridFactory(simpleModePC, 'cooler', '51 / 107', '27 / 85'));
      await transaction.save(pieceGridFactory(simpleModePC, 'pciExpress1', '32 / 89', '184 / 190'));
      await transaction.save(pieceGridFactory(simpleModePC, 'pciExpress1Docked', '1 / 145', '177 / 190'));
      await transaction.save(pieceGridFactory(simpleModePC, 'ram', '123 / 129', '17 / 97', 'ram_1'));
      await transaction.save(pieceGridFactory(simpleModePC, 'ram', '130 / 136', '17 / 97', 'ram_2'));
      await transaction.save(pieceGridFactory(simpleModePC, 'ramDocked', '125 / 127', '15 / 100', 'ram_1'));
      await transaction.save(pieceGridFactory(simpleModePC, 'ramDocked', '132 / 134', '15 / 100', 'ram_2'));

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

      // new Parts v2 ------------------------------------

      const motherPremiumGame = await transaction.save(motherFactory(
        'Premium Game',
        'motherBoard',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1625162673/DragAndDrop/motherBoard/PMAE_CINZA_4_RAM-01_zpy9en.png',
        'PMAE_CINZA_4_RAM-01_zpy9en',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1625162673/DragAndDrop/motherBoard/PMAE_CINZA_4_RAM-01_zpy9en.png',
        'PMAE_CINZA_4_RAM-01_zpy9en',
        'LGA1151',
        'H310',
        4,
        128,
        'DDR4',
        125,
        true
      ));

      const m2SockerMPG = await transaction.save(m2SocketFactory(motherPremiumGame));
      await transaction.save(m2SocketTypesFactory(m2SockerMPG));

      await transaction.save(pcieSocketFactory(motherPremiumGame, 'x16', 3));
      await transaction.save(pcieSocketFactory(motherPremiumGame, 'x16', 2));
      await transaction.save(pcieSocketFactory(motherPremiumGame, 'x1', 2));

      await transaction.save(motherFrequencyFactory(motherPremiumGame, 4266));
      await transaction.save(motherFrequencyFactory(motherPremiumGame, 4133));
      await transaction.save(motherFrequencyFactory(motherPremiumGame, 4000));
      await transaction.save(motherFrequencyFactory(motherPremiumGame, 3866));
      await transaction.save(motherFrequencyFactory(motherPremiumGame, 3800));
      await transaction.save(motherFrequencyFactory(motherPremiumGame, 3733));
      await transaction.save(motherFrequencyFactory(motherPremiumGame, 3666));
      await transaction.save(motherFrequencyFactory(motherPremiumGame, 3466));
      await transaction.save(motherFrequencyFactory(motherPremiumGame, 3400));
      await transaction.save(motherFrequencyFactory(motherPremiumGame, 3333));
      await transaction.save(motherFrequencyFactory(motherPremiumGame, 3200));
      await transaction.save(motherFrequencyFactory(motherPremiumGame, 3000));
      await transaction.save(motherFrequencyFactory(motherPremiumGame, 2800));
      await transaction.save(motherFrequencyFactory(motherPremiumGame, 2666));
      await transaction.save(motherFrequencyFactory(motherPremiumGame, 2400));

      const premiumGameModeMother = await transaction.save(gridMotherFactory('motherboard', motherPremiumGame));
      const premiumGameModePC = await transaction.save(gridMotherFactory('pc', motherPremiumGame));

      await transaction.save(pieceGridFactory(premiumGameModeMother, 'cpu', '87 / 113', '39 / 75'));
      await transaction.save(pieceGridFactory(premiumGameModeMother, 'cooler', '80 / 121', '29 / 85'));
      await transaction.save(pieceGridFactory(premiumGameModeMother, 'm2', '69 / 110', '132 / 151'));
      await transaction.save(pieceGridFactory(premiumGameModeMother, 'pciExpress1', '65 / 106', '184 / 191'));
      await transaction.save(pieceGridFactory(premiumGameModeMother, 'pciExpress1Docked', '41 / 150', '178 / 194'));
      await transaction.save(pieceGridFactory(premiumGameModeMother, 'ram', '123 / 127', '17 / 99', 'ram_1'));
      await transaction.save(pieceGridFactory(premiumGameModeMother, 'ram', '128 / 132', '17 / 99', 'ram_2'));
      await transaction.save(pieceGridFactory(premiumGameModeMother, 'ram', '133 / 137', '17 / 99', 'ram_3'));
      await transaction.save(pieceGridFactory(premiumGameModeMother, 'ram', '138 / 142', '17 / 99', 'ram_4'));
      await transaction.save(pieceGridFactory(premiumGameModeMother, 'ramDocked', '124 / 126', '15 / 100', 'ram_1'));
      await transaction.save(pieceGridFactory(premiumGameModeMother, 'ramDocked', '129 / 131', '15 / 100', 'ram_2'));
      await transaction.save(pieceGridFactory(premiumGameModeMother, 'ramDocked', '134 / 136', '15 / 100', 'ram_3'));
      await transaction.save(pieceGridFactory(premiumGameModeMother, 'ramDocked', '139 / 141', '15 / 100', 'ram_4'));

      await transaction.save(pieceGridFactory(premiumGameModePC, 'cpu', '63 / 97', '39 / 75'));
      await transaction.save(pieceGridFactory(premiumGameModePC, 'cooler', '51 / 107', '27 / 85'));
      await transaction.save(pieceGridFactory(premiumGameModePC, 'm2', '37/ 85', '133 / 150'));
      await transaction.save(pieceGridFactory(premiumGameModePC, 'pciExpress1', '32 / 89', '184 / 190'));
      await transaction.save(pieceGridFactory(premiumGameModePC, 'pciExpress1Docked', '1 / 145', '177 / 190'));
      await transaction.save(pieceGridFactory(premiumGameModePC, 'ram', '110 / 116', '17 / 97', 'ram_1'));
      await transaction.save(pieceGridFactory(premiumGameModePC, 'ram', '117 / 122', '17 / 97', 'ram_2'));
      await transaction.save(pieceGridFactory(premiumGameModePC, 'ram', '123 / 129', '17 / 97', 'ram_3'));
      await transaction.save(pieceGridFactory(premiumGameModePC, 'ram', '130 / 136', '17 / 97', 'ram_4'));
      await transaction.save(pieceGridFactory(premiumGameModePC, 'ramDocked', '112 / 114', '15 / 100', 'ram_1'));
      await transaction.save(pieceGridFactory(premiumGameModePC, 'ramDocked', '119 / 121', '15 / 100', 'ram_2'));
      await transaction.save(pieceGridFactory(premiumGameModePC, 'ramDocked', '125 / 127', '15 / 100', 'ram_3'));
      await transaction.save(pieceGridFactory(premiumGameModePC, 'ramDocked', '132 / 134', '15 / 100', 'ram_4'));

      // FDMGame
      const motherFMDGame = await transaction.save(motherFactory(
        'FMD Game',
        'motherBoard',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1625162673/DragAndDrop/motherBoard/PMAE_CINZA_4_RAM-01_zpy9en.png',
        'PMAE_CINZA_4_RAM-01_zpy9en',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1625162673/DragAndDrop/motherBoard/PMAE_CINZA_4_RAM-01_zpy9en.png',
        'PMAE_CINZA_4_RAM-01_zpy9en',
        'AM4',
        'A520',
        4,
        128,
        'DDR4',
        125,
        true
      ));

      const m2SockerMFMDG = await transaction.save(m2SocketFactory(motherFMDGame));
      await transaction.save(m2SocketTypesFactory(m2SockerMFMDG));

      await transaction.save(pcieSocketFactory(motherFMDGame, 'x16', 3));
      await transaction.save(pcieSocketFactory(motherFMDGame, 'x16', 2));
      await transaction.save(pcieSocketFactory(motherFMDGame, 'x1', 2));

      await transaction.save(motherFrequencyFactory(motherFMDGame, 4266));
      await transaction.save(motherFrequencyFactory(motherFMDGame, 4133));
      await transaction.save(motherFrequencyFactory(motherFMDGame, 4000));
      await transaction.save(motherFrequencyFactory(motherFMDGame, 3866));
      await transaction.save(motherFrequencyFactory(motherFMDGame, 3800));
      await transaction.save(motherFrequencyFactory(motherFMDGame, 3733));
      await transaction.save(motherFrequencyFactory(motherFMDGame, 3666));
      await transaction.save(motherFrequencyFactory(motherFMDGame, 3466));
      await transaction.save(motherFrequencyFactory(motherFMDGame, 3400));
      await transaction.save(motherFrequencyFactory(motherFMDGame, 3333));
      await transaction.save(motherFrequencyFactory(motherFMDGame, 3200));
      await transaction.save(motherFrequencyFactory(motherFMDGame, 3000));
      await transaction.save(motherFrequencyFactory(motherFMDGame, 2800));
      await transaction.save(motherFrequencyFactory(motherFMDGame, 2666));
      await transaction.save(motherFrequencyFactory(motherFMDGame, 2400));

      const FMDGameModeMother = await transaction.save(gridMotherFactory('motherboard', motherFMDGame));
      const FMDGameModePC = await transaction.save(gridMotherFactory('pc', motherFMDGame));

      await transaction.save(pieceGridFactory(FMDGameModeMother, 'cpu', '87 / 113', '39 / 75'));
      await transaction.save(pieceGridFactory(FMDGameModeMother, 'cooler', '80 / 121', '29 / 85'));
      await transaction.save(pieceGridFactory(FMDGameModeMother, 'm2', '69 / 110', '132 / 151'));
      await transaction.save(pieceGridFactory(FMDGameModeMother, 'pciExpress1', '65 / 106', '184 / 191'));
      await transaction.save(pieceGridFactory(FMDGameModeMother, 'pciExpress1Docked', '41 / 150', '178 / 194'));
      await transaction.save(pieceGridFactory(FMDGameModeMother, 'ram', '123/127', '17/99', 'ram_1'));
      await transaction.save(pieceGridFactory(FMDGameModeMother, 'ram', '128 / 132', '17 / 99', 'ram_2'));
      await transaction.save(pieceGridFactory(FMDGameModeMother, 'ram', '133 / 137', '17 / 99', 'ram_3'));
      await transaction.save(pieceGridFactory(FMDGameModeMother, 'ram', '138 / 142', '17 / 99', 'ram_4'));
      await transaction.save(pieceGridFactory(FMDGameModeMother, 'ramDocked', '124 / 126', '15 / 100', 'ram_1'));
      await transaction.save(pieceGridFactory(FMDGameModeMother, 'ramDocked', '129 / 131', '15 / 100', 'ram_2'));
      await transaction.save(pieceGridFactory(FMDGameModeMother, 'ramDocked', '134 / 136', '15 / 100', 'ram_3'));
      await transaction.save(pieceGridFactory(FMDGameModeMother, 'ramDocked', '139 / 141', '15 / 100', 'ram_4'));

      await transaction.save(pieceGridFactory(FMDGameModePC, 'cpu', '63 / 97', '39 / 75'));
      await transaction.save(pieceGridFactory(FMDGameModePC, 'cooler', '51 / 107', '27 / 85'));
      await transaction.save(pieceGridFactory(FMDGameModePC, 'm2', '37/ 85', '133 / 150'));
      await transaction.save(pieceGridFactory(FMDGameModePC, 'pciExpress1', '32 / 89', '184 / 190'));
      await transaction.save(pieceGridFactory(FMDGameModePC, 'pciExpress1Docked', '1 / 145', '177 / 190'));
      await transaction.save(pieceGridFactory(FMDGameModePC, 'ram', '123 / 129', '17 / 97', 'ram_1'));
      await transaction.save(pieceGridFactory(FMDGameModePC, 'ram', '130 / 136', '17 / 97', 'ram_2'));
      await transaction.save(pieceGridFactory(FMDGameModePC, 'ram', '130 / 136', '17 / 97', 'ram_3'));
      await transaction.save(pieceGridFactory(FMDGameModePC, 'ram', '130 / 136', '17 / 97', 'ram_4'));
      await transaction.save(pieceGridFactory(FMDGameModePC, 'ramDocked', '125 / 127', '15 / 100', 'ram_1'));
      await transaction.save(pieceGridFactory(FMDGameModePC, 'ramDocked', '132 / 134', '15 / 100', 'ram_2'));
      await transaction.save(pieceGridFactory(FMDGameModePC, 'ramDocked', '132 / 134', '15 / 100', 'ram_3'));
      await transaction.save(pieceGridFactory(FMDGameModePC, 'ramDocked', '132 / 134', '15 / 100', 'ram_4'));

      // fdm premium
      const motherFMDPremium = await transaction.save(motherFactory(
        'FMD premium',
        'motherBoard',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1625162662/DragAndDrop/motherBoard/PMAE_CINZA_4_RAM-02-01_d7gspm.png',
        'PMAE_CINZA_4_RAM-02-01_d7gspm',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1625162662/DragAndDrop/motherBoard/PMAE_CINZA_4_RAM-02-01_d7gspm.png',
        'PMAE_CINZA_4_RAM-02-01_d7gspm',
        'AM4',
        'A320',
        2,
        32,
        'DDR4',
        125,
        true
      ));

      const m2SockerFMDPremium = await transaction.save(m2SocketFactory(motherFMDPremium));
      await transaction.save(m2SocketTypesFactory(m2SockerFMDPremium));

      await transaction.save(pcieSocketFactory(motherFMDPremium, 'x16', 3));
      await transaction.save(pcieSocketFactory(motherFMDPremium, 'x16', 2));
      await transaction.save(pcieSocketFactory(motherFMDPremium, 'x1', 2));

      await transaction.save(motherFrequencyFactory(motherFMDPremium, 3200));
      await transaction.save(motherFrequencyFactory(motherFMDPremium, 2933));
      await transaction.save(motherFrequencyFactory(motherFMDPremium, 2666));
      await transaction.save(motherFrequencyFactory(motherFMDPremium, 2400));
      await transaction.save(motherFrequencyFactory(motherFMDPremium, 2133));

      const FMDPremiumModeMother = await transaction.save(gridMotherFactory('motherboard', motherFMDPremium));
      const FMDPremiumModePC = await transaction.save(gridMotherFactory('pc', motherFMDPremium));

      await transaction.save(pieceGridFactory(FMDPremiumModeMother, 'cpu', '87 / 113', '39 / 75'));
      await transaction.save(pieceGridFactory(FMDPremiumModeMother, 'cooler', '80 / 121', '29 / 85'));
      await transaction.save(pieceGridFactory(FMDPremiumModeMother, 'm2', '69 / 110', '132 / 151'));
      await transaction.save(pieceGridFactory(FMDPremiumModeMother, 'pciExpress1', '65 / 106', '184 / 191'));
      await transaction.save(pieceGridFactory(FMDPremiumModeMother, 'pciExpress1Docked', '41 / 150', '178 / 194'));
      await transaction.save(pieceGridFactory(FMDPremiumModeMother, 'ram', '133/137', '17/99', 'ram_1'));
      await transaction.save(pieceGridFactory(FMDPremiumModeMother, 'ram', '138 / 142', '17 / 99', 'ram_2'));
      await transaction.save(pieceGridFactory(FMDPremiumModeMother, 'ramDocked', '134 / 136', '15 / 100', 'ram_1'));
      await transaction.save(pieceGridFactory(FMDPremiumModeMother, 'ramDocked', '139 / 141', '15 / 100', 'ram_2'));

      await transaction.save(pieceGridFactory(FMDPremiumModePC, 'cpu', '63 / 97', '39 / 75'));
      await transaction.save(pieceGridFactory(FMDPremiumModePC, 'cooler', '51 / 107', '27 / 85'));
      await transaction.save(pieceGridFactory(FMDPremiumModePC, 'm2', '37/ 85', '133 / 150'));
      await transaction.save(pieceGridFactory(FMDPremiumModePC, 'pciExpress1', '32 / 89', '184 / 190'));
      await transaction.save(pieceGridFactory(FMDPremiumModePC, 'pciExpress1Docked', '1 / 145', '177 / 190'));
      await transaction.save(pieceGridFactory(FMDPremiumModePC, 'ram', '123 / 129', '17 / 97', 'ram_1'));
      await transaction.save(pieceGridFactory(FMDPremiumModePC, 'ram', '130 / 136', '17 / 97', 'ram_2'));
      await transaction.save(pieceGridFactory(FMDPremiumModePC, 'ramDocked', '125 / 127', '15 / 100', 'ram_1'));
      await transaction.save(pieceGridFactory(FMDPremiumModePC, 'ramDocked', '132 / 134', '15 / 100', 'ram_2'));

      const motherFDM153 = await transaction.save(motherFactory(
        'FMD 153',
        'motherBoard',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1625162673/DragAndDrop/motherBoard/PMAE_VERDE_4_RAM-02_zs2gei.png',
        'PMAE_VERDE_4_RAM-02_zs2gei',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1625162673/DragAndDrop/motherBoard/PMAE_VERDE_4_RAM-02_zs2gei.png',
        'PMAE_VERDE_4_RAM-02_zs2gei',
        'AM3+',
        '760G',
        4,
        32,
        'DDR3',
        80,
        false
      ));

      await transaction.save(pcieSocketFactory(motherFDM153, 'x16', 3));
      await transaction.save(pcieSocketFactory(motherFDM153, 'x16', 2));
      await transaction.save(pcieSocketFactory(motherFDM153, 'x1', 2));

      await transaction.save(motherFrequencyFactory(motherFDM153, 1600));
      await transaction.save(motherFrequencyFactory(motherFDM153, 2333));

      const FDM153ModeMother = await transaction.save(gridMotherFactory('motherboard', motherFDM153));
      const FDM153ModePC = await transaction.save(gridMotherFactory('pc', motherFDM153));

      await transaction.save(pieceGridFactory(FDM153ModeMother, 'cpu', '87 / 113', '39 / 75'));
      await transaction.save(pieceGridFactory(FDM153ModeMother, 'cooler', '80 / 121', '29 / 85'));
      await transaction.save(pieceGridFactory(FDM153ModeMother, 'm2', '69 / 110', '132 / 151'));
      await transaction.save(pieceGridFactory(FDM153ModeMother, 'pciExpress1', '65 / 106', '184 / 191'));
      await transaction.save(pieceGridFactory(FDM153ModeMother, 'pciExpress1Docked', '41 / 150', '178 / 194'));
      await transaction.save(pieceGridFactory(FDM153ModeMother, 'ram', '123/127', '17/99', 'ram_1'));
      await transaction.save(pieceGridFactory(FDM153ModeMother, 'ram', '128 / 132', '17 / 99', 'ram_2'));
      await transaction.save(pieceGridFactory(FDM153ModeMother, 'ram', '133 / 137', '17 / 99', 'ram_3'));
      await transaction.save(pieceGridFactory(FDM153ModeMother, 'ram', '138 / 142', '17 / 99', 'ram_4'));
      await transaction.save(pieceGridFactory(FDM153ModeMother, 'ramDocked', '124 / 126', '15 / 100', 'ram_1'));
      await transaction.save(pieceGridFactory(FDM153ModeMother, 'ramDocked', '129 / 131', '15 / 100', 'ram_2'));
      await transaction.save(pieceGridFactory(FDM153ModeMother, 'ramDocked', '134 / 136', '15 / 100', 'ram_3'));
      await transaction.save(pieceGridFactory(FDM153ModeMother, 'ramDocked', '139 / 141', '15 / 100', 'ram_4'));

      await transaction.save(pieceGridFactory(FDM153ModePC, 'cpu', '63 / 97', '39 / 75'));
      await transaction.save(pieceGridFactory(FDM153ModePC, 'cooler', '51 / 107', '27 / 85'));
      await transaction.save(pieceGridFactory(FDM153ModePC, 'm2', '37/ 85', '133 / 150'));
      await transaction.save(pieceGridFactory(FDM153ModePC, 'pciExpress1', '32 / 89', '184 / 190'));
      await transaction.save(pieceGridFactory(FDM153ModePC, 'pciExpress1Docked', '1 / 145', '177 / 190'));
      await transaction.save(pieceGridFactory(FDM153ModePC, 'ram', '110 / 116', '17 / 97', 'ram_1'));
      await transaction.save(pieceGridFactory(FDM153ModePC, 'ram', '117 / 122', '17 / 97', 'ram_2'));
      await transaction.save(pieceGridFactory(FDM153ModePC, 'ram', '123 / 129', '17 / 97', 'ram_3'));
      await transaction.save(pieceGridFactory(FDM153ModePC, 'ram', '130 / 136', '17 / 97', 'ram_4'));
      await transaction.save(pieceGridFactory(FDM153ModePC, 'ramDocked', '112 / 114', '15 / 100', 'ram_1'));
      await transaction.save(pieceGridFactory(FDM153ModePC, 'ramDocked', '119 / 121', '15 / 100', 'ram_2'));
      await transaction.save(pieceGridFactory(FDM153ModePC, 'ramDocked', '125 / 127', '15 / 100', 'ram_3'));
      await transaction.save(pieceGridFactory(FDM153ModePC, 'ramDocked', '132 / 134', '15 / 100', 'ram_4'));

      const cooler523 = await transaction.save(coolerFactory(
        'Cooler 523',
        'cooler',
        2000,
        35,
        35,
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614128996/DragAndDrop/cooler/cooler_dqjvtl.png',
        'cooler_dqjvtl',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614128996/DragAndDrop/cooler/cooler_dqjvtl.png',
        'cooler_dqjvtl'
      ));
      await transaction.save(coolerFrequencyFactory(cooler523, 'AM4'));
      await transaction.save(coolerFrequencyFactory(cooler523, 'AM3+'));
      await transaction.save(coolerFrequencyFactory(cooler523, 'LGA1151'));
      await transaction.save(coolerFrequencyFactory(cooler523, 'LGA1150'));
      await transaction.save(coolerFrequencyFactory(cooler523, 'LGA1200'));

      const coolerGM = await transaction.save(coolerFactory(
        'Cooler GM',
        'cooler',
        2000,
        65,
        45,
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614128996/DragAndDrop/cooler/cooler_dqjvtl.png',
        'cooler_dqjvtl',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614128996/DragAndDrop/cooler/cooler_dqjvtl.png',
        'cooler_dqjvtl'
      ));
      await transaction.save(coolerFrequencyFactory(coolerGM, 'AM4'));
      await transaction.save(coolerFrequencyFactory(coolerGM, 'LGA1151'));
      await transaction.save(coolerFrequencyFactory(coolerGM, 'LGA1150'));
      await transaction.save(coolerFrequencyFactory(coolerGM, 'LGA1200'));

      const cpuPent = await transaction.save(cpuFactory(
        'Cpu Pent',
        'cpu',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129003/DragAndDrop/cpu/cpu1_qetftx.png',
        'cpu1_qetftx',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129003/DragAndDrop/cpu/cpu1_qetftx.png',
        'cpu1_qetftx',
        'LGA1200',
        'H410 Express',
        4,
        2,
        4,
        4,
        4,
        'Intel UHD Graphics 610',
        2,
        32,
        58
      ));
      await transaction.save(cpuFrequencyFactory(cpuPent, 2666));

      const cpuFMDOld = await transaction.save(cpuFactory(
        'Cpu FMD old',
        'cpu',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129003/DragAndDrop/cpu/cpu1_qetftx.png',
        'cpu1_qetftx',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129003/DragAndDrop/cpu/cpu1_qetftx.png',
        'cpu1_qetftx',
        'AM3+',
        '760G',
        4,
        4,
        3.8,
        4,
        4,
        'Vega',
        4,
        32,
        95
      ));
      await transaction.save(cpuFrequencyFactory(cpuFMDOld, 2000));
      await transaction.save(cpuFrequencyFactory(cpuFMDOld, 1866));
      await transaction.save(cpuFrequencyFactory(cpuFMDOld, 1800));
      await transaction.save(cpuFrequencyFactory(cpuFMDOld, 1600));
      await transaction.save(cpuFrequencyFactory(cpuFMDOld, 1333));
      await transaction.save(cpuFrequencyFactory(cpuFMDOld, 1066));

      const FMDGamer = await transaction.save(cpuFactory(
        'Cpu FMD Gamer',
        'cpu',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129003/DragAndDrop/cpu/cpu1_qetftx.png',
        'cpu1_qetftx',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129003/DragAndDrop/cpu/cpu1_qetftx.png',
        'cpu1_qetftx',
        'AM4',
        'A520',
        12,
        6,
        3.7,
        4.6,
        35,
        'Vega',
        4,
        128,
        65
      ));
      await transaction.save(cpuFrequencyFactory(FMDGamer, 3200));
      await transaction.save(cpuFrequencyFactory(FMDGamer, 3000));
      await transaction.save(cpuFrequencyFactory(FMDGamer, 2800));
      await transaction.save(cpuFrequencyFactory(FMDGamer, 2666));
      await transaction.save(cpuFrequencyFactory(FMDGamer, 2400));

      const FMDPremium = await transaction.save(cpuFactory(
        'Cpu FMD Gamer',
        'cpu',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129003/DragAndDrop/cpu/cpu1_qetftx.png',
        'cpu1_qetftx',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129003/DragAndDrop/cpu/cpu1_qetftx.png',
        'cpu1_qetftx',
        'AM4',
        'A320',
        12,
        6,
        3.2,
        3.6,
        19,
        'Vega',
        2,
        32,
        65
      ));
      await transaction.save(cpuFrequencyFactory(FMDPremium, 3200));
      await transaction.save(cpuFrequencyFactory(FMDPremium, 2933));
      await transaction.save(cpuFrequencyFactory(FMDPremium, 2800));
      await transaction.save(cpuFrequencyFactory(FMDPremium, 2666));
      await transaction.save(cpuFrequencyFactory(FMDPremium, 2400));
      await transaction.save(cpuFrequencyFactory(FMDPremium, 2133));

      const FMDGamer122 = await transaction.save(cpuFactory(
        'Cpu FMD Gamer',
        'cpu',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129003/DragAndDrop/cpu/cpu1_qetftx.png',
        'cpu1_qetftx',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129003/DragAndDrop/cpu/cpu1_qetftx.png',
        'cpu1_qetftx',
        'AM4',
        'A520',
        16,
        8,
        3.6,
        4.4,
        32,
        'Vega',
        2,
        64,
        65
      ));
      await transaction.save(cpuFrequencyFactory(FMDGamer122, 3200));
      await transaction.save(cpuFrequencyFactory(FMDGamer122, 3000));
      await transaction.save(cpuFrequencyFactory(FMDGamer122, 2800));
      await transaction.save(cpuFrequencyFactory(FMDGamer122, 2666));
      await transaction.save(cpuFrequencyFactory(FMDGamer122, 2400));

      const premiumGame = await transaction.save(cpuFactory(
        'Premium Game',
        'cpu',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129003/DragAndDrop/cpu/cpu1_qetftx.png',
        'cpu1_qetftx',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129003/DragAndDrop/cpu/cpu1_qetftx.png',
        'cpu1_qetftx',
        'LGA1151',
        'Z390',
        16,
        8,
        3.6,
        5,
        16,
        'Vega',
        4,
        128,
        95
      ));
      await transaction.save(cpuFrequencyFactory(premiumGame, 3400));
      await transaction.save(cpuFrequencyFactory(premiumGame, 3333));
      await transaction.save(cpuFrequencyFactory(premiumGame, 3200));
      await transaction.save(cpuFrequencyFactory(premiumGame, 3000));
      await transaction.save(cpuFrequencyFactory(premiumGame, 2933));
      await transaction.save(cpuFrequencyFactory(premiumGame, 2800));
      await transaction.save(cpuFrequencyFactory(premiumGame, 2666));
      await transaction.save(cpuFrequencyFactory(premiumGame, 2400));

      await transaction.save(psuFactory(
        'Fonte 550W',
        'powerSupply',
        550,
        'Bivolt',
        0,
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129016/DragAndDrop/powerSupply/powerSupply_izjyph.png',
        'powerSupply_izjyph',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129016/DragAndDrop/powerSupply/powerSupplyLateral_qmp3ia.png',
        'powerSupplyLateral_qmp3ia'
      ));

      await transaction.save(psuFactory(
        'Fonte 650W',
        'powerSupply',
        650,
        'Bivolt',
        0,
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129016/DragAndDrop/powerSupply/powerSupply_izjyph.png',
        'powerSupply_izjyph',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129016/DragAndDrop/powerSupply/powerSupplyLateral_qmp3ia.png',
        'powerSupplyLateral_qmp3ia'
      ));

      await transaction.save(psuFactory(
        'Fonte 750W',
        'powerSupply',
        750,
        'Bivolt',
        0,
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129016/DragAndDrop/powerSupply/powerSupply_izjyph.png',
        'powerSupply_izjyph',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129016/DragAndDrop/powerSupply/powerSupplyLateral_qmp3ia.png',
        'powerSupplyLateral_qmp3ia'
      ));

      await transaction.save(psuFactory(
        'Fonte 850W',
        'powerSupply',
        850,
        'Bivolt',
        0,
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129016/DragAndDrop/powerSupply/powerSupply_izjyph.png',
        'powerSupply_izjyph',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129016/DragAndDrop/powerSupply/powerSupplyLateral_qmp3ia.png',
        'powerSupplyLateral_qmp3ia'
      ));

      // await transaction.save(ramFactory(
      //   'DDR3 - 1066',
      //   'ram',
      //   'DDR3',
      //   1066,
      //   8,
      //   2,
      //   'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129024/DragAndDrop/ram/ram2_a0x5nt.png',
      //   'ram2_a0x5nt',
      //   'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129023/DragAndDrop/ram/ram2drop_lphsls.png',
      //   'ram2drop_lphsls'
      // ));

      // await transaction.save(ramFactory(
      //   'DDR3 - 1333',
      //   'ram',
      //   'DDR3',
      //   1333,
      //   8,
      //   2,
      //   'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129024/DragAndDrop/ram/ram2_a0x5nt.png',
      //   'ram2_a0x5nt',
      //   'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129023/DragAndDrop/ram/ram2drop_lphsls.png',
      //   'ram2drop_lphsls'
      // ));

      // await transaction.save(ramFactory(
      //   'DDR4 - 2133',
      //   'ram',
      //   'DDR4',
      //   2133,
      //   8,
      //   2,
      //   'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129023/DragAndDrop/ram/ram1_leolkv.png',
      //   'ram2drop_lphsls',
      //   'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129023/DragAndDrop/ram/ram1drop_ncwrga.png',
      //   'ram1drop_ncwrga'
      // ));

      // await transaction.save(ramFactory(
      //   'DDR4 - 2666',
      //   'ram',
      //   'DDR4',
      //   2666,
      //   8,
      //   2,
      //   'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129023/DragAndDrop/ram/ram1_leolkv.png',
      //   'ram2drop_lphsls',
      //   'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129023/DragAndDrop/ram/ram1drop_ncwrga.png',
      //   'ram1drop_ncwrga'
      // ));

      // await transaction.save(ramFactory(
      //   'DDR4 - 3200',
      //   'ram',
      //   'DDR4',
      //   3200,
      //   8,
      //   2,
      //   'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129023/DragAndDrop/ram/ram1_leolkv.png',
      //   'ram2drop_lphsls',
      //   'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129023/DragAndDrop/ram/ram1drop_ncwrga.png',
      //   'ram1drop_ncwrga'
      // ));
      // await transaction.save(ramFactory(
      //   'DDR4 - 2666',
      //   'ram',
      //   'DDR4',
      //   2666,
      //   8,
      //   2,
      //   'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129023/DragAndDrop/ram/ram1_leolkv.png',
      //   'ram2drop_lphsls',
      //   'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129023/DragAndDrop/ram/ram1drop_ncwrga.png',
      //   'ram1drop_ncwrga'
      // ));

      await transaction.save(ramFactory(
        'DDR4 - 2666',
        'ram',
        'DDR4',
        2666,
        2,
        2,
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129023/DragAndDrop/ram/ram1_leolkv.png',
        'ram2drop_lphsls',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129023/DragAndDrop/ram/ram1drop_ncwrga.png',
        'ram1drop_ncwrga'
      ));
      await transaction.save(ramFactory(
        'DDR4 - 2666',
        'ram',
        'DDR4',
        2666,
        4,
        2,
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129023/DragAndDrop/ram/ram1_leolkv.png',
        'ram2drop_lphsls',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129023/DragAndDrop/ram/ram1drop_ncwrga.png',
        'ram1drop_ncwrga'
      ));

      await transaction.save(ramFactory(
        'DDR4 - 2666',
        'ram',
        'DDR4',
        2666,
        16,
        2,
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129023/DragAndDrop/ram/ram1_leolkv.png',
        'ram2drop_lphsls',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129023/DragAndDrop/ram/ram1drop_ncwrga.png',
        'ram1drop_ncwrga'
      ));

      await transaction.save(ramFactory(
        'DDR4 - 2133',
        'ram',
        'DDR4',
        2133,
        2,
        2,
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129023/DragAndDrop/ram/ram1_leolkv.png',
        'ram2drop_lphsls',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129023/DragAndDrop/ram/ram1drop_ncwrga.png',
        'ram1drop_ncwrga'
      ));

      await transaction.save(ramFactory(
        'DDR4 - 2133',
        'ram',
        'DDR4',
        2133,
        4,
        2,
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129023/DragAndDrop/ram/ram1_leolkv.png',
        'ram2drop_lphsls',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129023/DragAndDrop/ram/ram1drop_ncwrga.png',
        'ram1drop_ncwrga'
      ));

      await transaction.save(ramFactory(
        'DDR4 - 2133',
        'ram',
        'DDR4',
        2133,
        16,
        2,
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129023/DragAndDrop/ram/ram1_leolkv.png',
        'ram2drop_lphsls',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129023/DragAndDrop/ram/ram1drop_ncwrga.png',
        'ram1drop_ncwrga'
      ));

      await transaction.save(ramFactory(
        'DDR4 - 3200',
        'ram',
        'DDR4',
        3200,
        2,
        2,
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129023/DragAndDrop/ram/ram1_leolkv.png',
        'ram2drop_lphsls',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129023/DragAndDrop/ram/ram1drop_ncwrga.png',
        'ram1drop_ncwrga'
      ));

      await transaction.save(ramFactory(
        'DDR4 - 3200',
        'ram',
        'DDR4',
        3200,
        4,
        2,
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129023/DragAndDrop/ram/ram1_leolkv.png',
        'ram2drop_lphsls',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129023/DragAndDrop/ram/ram1drop_ncwrga.png',
        'ram1drop_ncwrga'
      ));

      await transaction.save(ramFactory(
        'DDR4 - 3200',
        'ram',
        'DDR4',
        3200,
        16,
        2,
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129023/DragAndDrop/ram/ram1_leolkv.png',
        'ram2drop_lphsls',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129023/DragAndDrop/ram/ram1drop_ncwrga.png',
        'ram1drop_ncwrga'
      ));

      await transaction.save(ramFactory(
        'DDR4 - 3000',
        'ram',
        'DDR4',
        3000,
        2,
        2,
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129023/DragAndDrop/ram/ram1_leolkv.png',
        'ram2drop_lphsls',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129023/DragAndDrop/ram/ram1drop_ncwrga.png',
        'ram1drop_ncwrga'
      ));

      await transaction.save(ramFactory(
        'DDR4 - 3000',
        'ram',
        'DDR4',
        3000,
        4,
        2,
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129023/DragAndDrop/ram/ram1_leolkv.png',
        'ram2drop_lphsls',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129023/DragAndDrop/ram/ram1drop_ncwrga.png',
        'ram1drop_ncwrga'
      ));

      await transaction.save(ramFactory(
        'DDR4 - 3000',
        'ram',
        'DDR4',
        3000,
        16,
        2,
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129023/DragAndDrop/ram/ram1_leolkv.png',
        'ram2drop_lphsls',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129023/DragAndDrop/ram/ram1drop_ncwrga.png',
        'ram1drop_ncwrga'
      ));

      await transaction.save(ramFactory(
        'DDR4 - 2400',
        'ram',
        'DDR4',
        2400,
        2,
        2,
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129023/DragAndDrop/ram/ram1_leolkv.png',
        'ram2drop_lphsls',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129023/DragAndDrop/ram/ram1drop_ncwrga.png',
        'ram1drop_ncwrga'
      ));

      await transaction.save(ramFactory(
        'DDR4 - 2400',
        'ram',
        'DDR4',
        2400,
        4,
        2,
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129023/DragAndDrop/ram/ram1_leolkv.png',
        'ram2drop_lphsls',
        'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129023/DragAndDrop/ram/ram1drop_ncwrga.png',
        'ram1drop_ncwrga'
      ));

      await transaction.save(ramFactory(
        'DDR4 - 2400',
        'ram',
        'DDR4',
        2400,
        16,
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
        1066,
        2,
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
        1066,
        4,
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
        1066,
        16,
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
        2,
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
        4,
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
        16,
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
        1600,
        2,
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
        1600,
        4,
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
        1600,
        16,
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
        1333,
        2,
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
        1333,
        4,
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
        1333,
        16,
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
