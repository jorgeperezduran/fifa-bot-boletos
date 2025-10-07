import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import * as querystring from 'qs';

export class ApiHelper {

  async get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    try {
      return await axios.get(url, {
        ...config, paramsSerializer: (params) => {
          return querystring.stringify(params, { allowDots: true, arrayFormat: 'comma' });
        }
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async delete(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    try {
      return await axios.delete(url, config);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async post(url: string, data: object, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    try {
      return await axios.post(url, data, config);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async put(url: string, data: object, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    try {
      return await axios.put(url, data, config);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async patch(url: string, data: object, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    try {
      return await axios.patch(url, data, config);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
