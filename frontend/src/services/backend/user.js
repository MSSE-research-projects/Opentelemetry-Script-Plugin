import { request } from 'umi';

const USER_ENDPOINT = '/api/users';

const errorHandler = (error) => {
  console.log(error);
  return error;
}

export async function createUser(body) {
  return request(`${USER_ENDPOINT}/register`, {
    method: 'POST',
    data: body,
    errorHandler
  });
}

export async function loginUser(body) {
  return request(`${USER_ENDPOINT}/login`, {
    method: 'POST',
    data: body,
    errorHandler
  });
}

export async function loginUserWithCredential(credential) {
  return request(`${USER_ENDPOINT}/login`, {
    method: 'GET',
    headers: {
      authorization: credential
    },
    errorHandler
  });
}
