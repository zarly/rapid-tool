
import { expect } from 'chai';
import axios from 'axios';
import { start, PORT } from '../../core';
import * as helpers from './auth.helpers';

const HOST = `http://localhost:${PORT}`;

describe('auth', function () {
  let server;

  beforeEach(async () => {
    server = await start({ silent: true });
  });

  afterEach(() => {
    if (server && server.close) server.close();
  });

  it('register and login works', async function () {
    const res1 = await helpers.signUp();
    expect(res1.status).equal(200);

    const res2 = await helpers.signIn();
    expect(res2.status).equal(200);
  });

  it('incorrect email returns 401', async function () {
    const res1 = await helpers.signUp();
    expect(res1.status).equal(200);

    const res2 = await helpers.signIn({ email: 'bbb@aaa.aa' });
    expect(res2.status).equal(401);
  });

  it('incorrect password returns 401', async function () {
    const res1 = await helpers.signUp();
    expect(res1.status).equal(200);

    const res2 = await helpers.signIn({ password: '222' });
    expect(res2.status).equal(401);
  });

  it('profile returns 401 for unauthorized user', async function () {
    const res = await helpers.me();
    expect(res.status).equal(401);
  });

  it('profile is available for authorized user', async function () {
    const res1 = await helpers.signUp();
    expect(res1.status).equal(200);

    const res2 = await helpers.signIn();
    expect(res2.status).equal(200);
    const cookies = helpers.parseSetCookies(res2);
    
    const res3 = await axios.get(HOST + '/auth/me', {
      headers: {
        Cookie: helpers.buildCookieHeader(cookies),
      },
    });
    expect(res3.status).equal(200);
    expect(res3.data.name).equal('aaa');
    expect(res3.data.email).equal('aaa@aaa.aa');
  });

  it('logout works', async function () {
    const res1 = await helpers.signUp();
    expect(res1.status).equal(200);

    const res2 = await helpers.signIn();
    expect(res2.status).equal(200);
    const cookies2 = helpers.parseSetCookies(res2);
    
    const res3 = await helpers.me({}, cookies2);
    expect(res3.status).equal(200);

    const res4 = await helpers.logout();
    expect(res4.status).equal(200);
    const cookies4 = helpers.parseSetCookies(res4, cookies2);
    expect(cookies4.session).equal(undefined);

    const res5 = await helpers.me({}, cookies4);
    expect(res5.status).equal(401);
  });
});
