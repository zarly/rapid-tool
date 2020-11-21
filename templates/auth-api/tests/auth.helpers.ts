import { expect } from 'chai';
import axios from 'axios';
import { PORT } from '../../core';

const HOST = `http://localhost:${PORT}`;

export function signUp(params: any = {}) {
    return axios.post(HOST + '/auth/signup', {
        name: 'aaa',
        email: 'aaa@aaa.aa',
        password: '111',
        ...params,
    }).catch(it => it.response);
}

export function signIn(params: any = {}) {
    return axios.post(HOST + '/auth/signin', {
      email: 'aaa@aaa.aa',
      password: '111',
        ...params,
    }).catch(it => it.response);
}

export function logout(params: any = {}) {
    return axios.post(HOST + '/auth/logout').catch(it => it.response);
}

export function changePassword(params: any = {}, cookies: any) {
    return axios.post(HOST + '/auth/change-password', {
      oldPassword: '111',
      newPassword: '111',
        ...params,
    }, {
        headers: {
            Cookie: buildCookieHeader(cookies),
        }
    }).catch(it => it.response);
}

export function me(params: any = {}, cookies: any) {
    return axios.get(HOST + '/auth/me', {
        headers: {
            Cookie: buildCookieHeader(cookies),
        },
    }).catch(it => it.response);
}

export function parseSetCookies(res: any, oldCookies: any = {}) {
    const cookieHeaders = res.headers['set-cookie'];
    if (!cookieHeaders || !cookieHeaders.length) return {};

    const result: any = {};
    for (let i = 0; i < cookieHeaders.length; i++) {
        const cookieMatch = /(.*?)=(.*?);/.exec(cookieHeaders[i]);
        const name = cookieMatch && cookieMatch[1] || '';
        const value = cookieMatch && cookieMatch[2] || '';

        const expiresMatch: any = /;[ ]?Expires=(.*?)[;$]/.exec(cookieHeaders[i]);
        const expiresDate = new Date(expiresMatch && expiresMatch[1]);

        if (expiresDate < new Date()) {
            result[name] = undefined;
        } else {
            result[name] = value;
        }
    }
    return { ...oldCookies, ...result };
}

export function buildCookieHeader(cookies: any = {}) {
    return Object.keys(cookies)
        .filter(key => cookies[key] !== undefined)
        .map(key => `${key}=${cookies[key]};`)
        .join('');
}
