import supertest from 'supertest';

import app from '../../src/server';
import { testErrors } from '../helper';
import startConnection from '../../src/database/index';

const finish: string = '/finish';
const request = supertest(app);

const parts = ():any => ({
  motherBoard: {
    TDP: 125,
    chipset: 'H410 Express',
    dropImage: 'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129009/DragAndDrop/motherBoard/mother1_iumte0.png',
    hasSocketM2: true,
    id: 1,
    image: 'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129009/DragAndDrop/motherBoard/mother1_iumte0.png',
    memorySizeSupport: 64,
    memorySlotAmount: 2,
    memorySlotFrequency: [2933, 2666, 2400, 2133],
    memorySlotType: 'DDR4',
    name: 'motherBoard Premium',
    socket: 'LGA1200',
    socketM2: [{ type: ['NVMe'] }],
    socketPCIE: [{ type: 'x16', version: 3 }, { type: 'x16', version: 2 }, { type: 'x1', version: 2 }],
    type: 'motherBoard'
  },
  cpu: {
    TDP: 65,
    baseClockSpeed: 2.9,
    cache: 12,
    chipset: 'H410 Express',
    core: 6,
    dropImage: 'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129003/DragAndDrop/cpu/cpu1_qetftx.png',
    graphicsProcessor: 'Intel UHD Graphics 630',
    id: 1,
    image: 'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129003/DragAndDrop/cpu/cpu1_qetftx.png',
    maximumBoostSpeed: 4.3,
    memorySizeSupport: 64,
    memorySupportAmountSlot: 2,
    memorySupportFrequency: [2933, 266, 2400, 2133],
    name: 'Cpu Premium',
    socket: 'LGA1200',
    threads: 12,
    type: 'cpu'
  },
  cooler: {
    TDP: 35,
    compatibilityCpu: ['LGA1200'],
    dropImage: 'https://res.cloudinary.com/drbclvi9z/image/upload/v1614128996/DragAndDrop/cooler/cooler_dqjvtl.png',
    fanAirflow: 42,
    id: 1,
    image: 'https://res.cloudinary.com/drbclvi9z/image/upload/v1614128996/DragAndDrop/cooler/cooler_dqjvtl.png',
    name: 'Cooler Premium',
    speedFan: 2200,
    type: 'cooler'
  },
  ram: [{
    TDP: 2,
    div: 'ram_2',
    dropImage: 'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129023/DragAndDrop/ram/ram1drop_ncwrga.png',
    id: 2,
    image: 'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129023/DragAndDrop/ram/ram1_leolkv.png',
    memoryFrequency: 3000,
    memorySize: 8,
    memorySlotType: 'DDR4',
    name: 'Memória DDR4',
    type: 'ram'
  }],
  powerSupply: {
    TDP: 0,
    dropImage: 'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129016/DragAndDrop/powerSupply/powerSupplyLateral_qmp3ia.png',
    id: 2,
    image: 'https://res.cloudinary.com/drbclvi9z/image/upload/v1614129016/DragAndDrop/powerSupply/powerSupply_izjyph.png',
    name: 'Fonte 400W',
    type: 'powerSupply',
    voltage: 'Bivolt',
    wattage: 400
  }
});

beforeAll(async () => {
  await startConnection();
});

describe('Suit de tests for generate PDF', (): void => {
  test('generate PDF sucess [ success ] [ /finish ]',
    async (done: jest.DoneCallback) => {
      const { status, body } = await request.post(`${finish}`)
        .send(parts());

      expect(status).toBe(200);
      expect(body).toBeTruthy();

      done();
    });

  test('[ ERR: 003-003 ] - [ /finish ]',
    async (done: jest.DoneCallback) => {
      const value = parts();
      value.motherBoard = undefined;
      const { status, body } = await request.post(finish)
        .send(value);

      expect(status).toBe(404);
      testErrors(body, 'Seu computador precisa de uma placa-mãe.');
      done();
    });

  test('[ ERR: 003-004 ] - [ /finish ]',
    async (done: jest.DoneCallback) => {
      const value = parts();
      value.motherBoard = undefined;
      const { status, body } = await request.post(`${finish}`)
        .send(value);

      expect(status).toBe(404);
      testErrors(body, 'Seu computador precisa de uma processador.');
      done();
    });

  test('[ ERR: 003-005 ] - [ /finish ]',
    async (done: jest.DoneCallback) => {
      const value = parts();
      value.cooler = undefined;
      const { status, body } = await request.post(`${finish}`)
        .send(value);

      expect(status).toBe(404);
      testErrors(body, 'Seu computador precisa de uma cooler.');
      done();
    });

  test('[ ERR: 003-006 ] - [ /finish ]',
    async (done: jest.DoneCallback) => {
      const value = parts();
      value.ram = [];
      const { status, body } = await request.post(`${finish}`)
        .send(value);

      expect(status).toBe(404);
      testErrors(body, 'Seu computador precisa de pelo menos uma memória.');
      done();
    });

  test('[ ERR: 003-007 ] - [ /finish ]',
    async (done: jest.DoneCallback) => {
      const value = parts();
      value.powerSupply = undefined;
      const { status, body } = await request.post(`${finish}`)
        .send(value);

      expect(status).toBe(404);
      testErrors(body, 'Seu computador precisa de uma fonte de energia.');
      done();
    });
});
