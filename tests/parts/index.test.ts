import supertest from 'supertest';

import app from '../../src/server';
import { testErrors } from '../helper';
import startConnection from '../../src/database/index';

const pathIndexByParts: string = '/v1/piece';
const request = supertest(app);

beforeAll(async () => {
  await startConnection();
});

describe('Suit de tests for index parts by type', (): void => {
  test('index parts by type sucess [ success ] [ /v1/piece ]',
    async (done: jest.DoneCallback) => {
      const { status, body } = await request.get(pathIndexByParts)
        .query({ type: 'ram' })
        .send();

      expect(status).toBe(200);
      expect(body).toBeTruthy();

      done();
    });

  test('[ ERR: 001-001 ] - [ /v1/piece ]', async done => {
    const { status, body: { result } } = await request.get(pathIndexByParts)
      .send();

    expect(status).toBe(404);
    testErrors(result, 'Tipo de peça não informado.');
    done();
  });

  test('[ ERR: 001-002 ] - [ /v1/piece ]', async done => {
    const { status, body: { result } } = await request.get(pathIndexByParts)
      .query({ type: 'error' })
      .send();

    expect(status).toBe(404);
    testErrors(result, 'Tipo de peça não cadastrado.');
    done();
  });
});
