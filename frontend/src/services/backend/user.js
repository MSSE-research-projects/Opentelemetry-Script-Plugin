import { request } from 'umi';

const USER_ENDPOINT = '/api/users';

export async function createUser(body) {
  return request(`${USER_ENDPOINT}/register`, {
    method: 'POST',
    data: body,
  });
}

export async function loginUser(body) {
  return request(`${USER_ENDPOINT}/login`, {
    method: 'POST',
    data: body,
  });
}

export async function loginUserWithCredential(credential) {
  return request(`${USER_ENDPOINT}/login`, {
    method: 'GET',
    authorization: credential
  });
}
