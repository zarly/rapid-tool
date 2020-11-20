
import { expect } from 'chai';
import axios from 'axios';
import { start, PORT } from '../../core';

const HOST = `http://localhost:${PORT}`;

describe('core start', function () {
  let server;

  beforeEach(async () => {
    server = await start({ silent: true });
  });

  afterEach(() => {
    if (server && server.close) server.close();
  });

  it('/', async function () {
    const response = await axios.get(HOST + '/');
    expect(response.status).equal(200);
  });

  it('/ping', async function () {
    const response = await axios.get(HOST + '/ping');
    expect(response.status).equal(200);
    expect(response.data).deep.equal({pong: true});
  });
});
