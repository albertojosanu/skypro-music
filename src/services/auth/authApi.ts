import axios from 'axios';
import { BASE_URL } from '../constants';

type registerUserProps = {
  email: string;
  password: string;
  username: string;
};

type authUserProps = {
  email: string;
  password: string;
};

type userReturn = {
  email: string;
  username: string;
  _id: number;
};

type authUserReturn = {
  access: string;
  refresh: string;
};

type accessTokenType = {
  access: string;
};

type refreshTokenType = {
  refresh: string;
};

type tokensType = accessTokenType & refreshTokenType;

export const registerUser = (data: registerUserProps): Promise<userReturn> => {
  return axios
    .post(BASE_URL + '/user/signup', data, {
      headers: {
        'content-type': 'application/json',
      },
    })
    .then((res) => {
      return res.data.data.result;
    });
};

export const authUser = (data: authUserProps): Promise<userReturn> => {
  return axios
    .post(BASE_URL + '/user/login', data, {
      headers: {
        'content-type': 'application/json',
      },
    })
    .then((res) => {
      return res.data.data;
    });
};

export const getTokens = (data: authUserProps): Promise<tokensType> => {
  return axios
    .post(BASE_URL + '/user/token', data, {
      headers: {
        'content-type': 'application/json',
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const refreshToken = (refresh: string): Promise<{ access: string }> => {
  return axios
    .post(
      BASE_URL + '/user/token/refresh',
      { refresh },
      {
        headers: {
          'content-type': 'application/json',
        },
      },
    )
    .then((res) => {
      return res.data;
    });
};
