import axios from 'axios';

type AxiosReqType = {
  method: 'GET' | 'PUT' | 'POST' | 'DELETE' | 'GetNormal';
  reqUrl: string;
  body?: object;
  ip?: string;
};

const baseURL = 'http://localhost:8080/api/';
const origin = window.location.host;
const headers = {
  origin,
};

const axiosConfig = {
  baseURL,
  withCredentials: true,
  headers,
};

const axiosReq = ({ method, reqUrl, body, ip }: AxiosReqType) => {
  switch (method) {
    case 'GET':
      return axios.get(reqUrl, {
        ...axiosConfig,
        headers: {
          ...axiosConfig.headers,
          ip,
        },
      });

    case 'PUT':
      return axios.put(reqUrl, body, {
        ...axiosConfig,
        headers: {
          ...axiosConfig.headers,
          ip,
        },
      });

    case 'POST':
      return axios.post(reqUrl, body, {
        ...axiosConfig,
        headers: {
          ...axiosConfig.headers,
          ip,
        },
      });

    case 'DELETE':
      return axios.delete(reqUrl, {
        ...axiosConfig,
        headers: {
          ...axiosConfig.headers,
          ip,
        },
      });

    case 'GetNormal':
      return axios.get(reqUrl);

    default:
      return;
  }
};

export default axiosReq;
