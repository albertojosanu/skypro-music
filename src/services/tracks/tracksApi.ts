import axios from 'axios';
import { BASE_URL } from '../constants';
import { TrackType, SelectionType } from '@/sharedTypes/sharedTypes';

export const getTracks = (): Promise<TrackType[]> => {
  return axios(BASE_URL + '/catalog/track/all').then((res) => {
    return res.data.data;
  });
};

export const getTrack = (id: string): Promise<TrackType> => {
  return axios(BASE_URL + '/catalog/track/' + id).then((res) => {
    return res.data.data;
  });
};

export const getSelections = (): Promise<SelectionType[]> => {
  return axios(BASE_URL + '/catalog/selection/all').then((res) => {
    return res.data.data;
  });
};

export const getSelection = (id: string): Promise<SelectionType> => {
  return axios(BASE_URL + '/catalog/selection/' + id).then((res) => {
    return res.data.data;
  });
};

export const getFavorites = (access: string): Promise<TrackType[]> => {
  return axios(BASE_URL + '/catalog/track/favorite/all/', {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  }).then((res) => {
    return res.data.data;
  });
};

export const addLike = (access: string, id: number) => {
  return axios.post(
    BASE_URL + `/catalog/track/${id}/favorite/`,
    {},
    {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    },
  );
};

export const removeLike = (access: string, id: number) => {
  return axios.delete(BASE_URL + `/catalog/track/${id}/favorite/`, {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
};
