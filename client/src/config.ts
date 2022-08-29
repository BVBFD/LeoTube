import axios from 'axios';

type AxiosReqType = {
  method: 'GET' | 'PUT' | 'POST' | 'DELETE';
  reqUrl: string;
  body?: object;
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

const axiosInstance = axios.create(axiosConfig);

const axiosReq = ({ method, reqUrl, body }: AxiosReqType) => {
  switch (method) {
    case 'GET':
      return axiosInstance.get(reqUrl);

    case 'PUT':
      return axiosInstance.put(reqUrl, body);

    case 'POST':
      return axiosInstance.post(reqUrl, body);

    case 'DELETE':
      return axiosInstance.delete(reqUrl);

    default:
      return;
  }
};

export default axiosReq;
