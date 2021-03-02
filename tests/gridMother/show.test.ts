import supertest from 'supertest';

import app from '../../src/server';
import { testErrors } from '../helper';
import startConnection from '../../src/database/index';

const showMotherBoard: string = '/v1/gridMother/mother/';
const request = supertest(app);

beforeAll(async () => {
  await startConnection();
});
describe('Suit de tests for show motheboard ID', (): void => {
  test('index parts by type sucess [ success ] [ /v1/gridMother/mother/:id ]',
    async (done: jest.DoneCallback) => {
      const { status, body } = await request.get(`${showMotherBoard}1`)
        .send();

      expect(status).toBe(200);
      expect(body).toBeTruthy();

      done();
    });

  test('[ ERR: 002-001 ] - [ /v1/gridMother/mother/:id ]',
    async (done: jest.DoneCallback) => {
      const { status, body: { result } } = await request.get(`${showMotherBoard}null`)
        .send();

      expect(status).toBe(404);
      testErrors(result, 'Nescessário informar um ID.');
      done();
    });

  test('[ ERR: 002-002 ] - [ /v1/gridMother/mother/:id ]',
    async (done: jest.DoneCallback) => {
      const { status, body: { result } } = await request.get(`${showMotherBoard}10`)
        .send();

      expect(status).toBe(404);
      testErrors(result, 'Placa-mãe não cadastrado.');
      done();
    });
});
