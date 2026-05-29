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
