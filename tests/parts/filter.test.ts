import supertest from 'supertest';

import app from '../../src/server';
import { testErrors } from '../helper';
import startConnection from '../../src/database/index';

const pathFilter: string = '/v1/piece/filter';
const request = supertest(app);
const filterBody = {
  memoryFrequency: '1600',
  memorySize: '8',
  memorySlotType: 'DDR4',
  type: 'ram'
};

beforeAll(async () => {
  await startConnection();
});

describe('Suit de tests for filter parts ', (): void => {
  test('filter parts [ success ] [ /v1/piece/filter ]',
    async (done: jest.DoneCallback) => {
      const { status, body } = await request.get(pathFilter)
        .query(filterBody)
        .send();

      expect(status).toBe(200);
      expect(body).toBeTruthy();

      done();
    });

  test('[ 001-001 ] - [ /v1/piece/filter ]', async done => {
    const { status, body: { result } } = await request.get(pathFilter)
      .query({})
      .send();

    expect(status).toBe(404);
    testErrors(result, 'Tipo de peça não informado.');
    done();
  });

  test('[ 001-002 ] - [ /v1/piece/filter ]', async done => {
    const { status, body: { result } } = await request.get(pathFilter)
      .query({ type: 'error' })
      .send();

    expect(status).toBe(404);
    testErrors(result, 'Tipo de peça não cadastrado.');
    done();
  });

  test('[ 004-001 ] - [ /v1/piece/filter ]', async done => {
    const { status, body: { result } } = await request.get(pathFilter)
      .query({ type: 'motherBoard', memorySizeSupport: 'DDR5' })
      .send();

    expect(status).toBe(404);
    testErrors(result, 'Formato de um dos campos enviado errado.');
    done();
  });

  test('[ 004-002 ] - [ /v1/piece/filter ]', async done => {
    const { status, body: { result } } = await request.get(pathFilter)
      .query({ type: 'ram', memorySizeSupport: 'DDR5' })
      .send();

    expect(status).toBe(404);
    testErrors(result, 'Nenhuma peçã com essas caracteristicas.');
    done();
  });
});
