import axios, { AxiosResponse } from 'axios';
import { API_URL, LOCAL_STORAGE_USER_KEY } from '../constants';

const instance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_KEY) as string);
    if (user && user.accessToken) {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
    }
    return config;
});

export const getRequest = async <T = any>(url: string, params?: any): Promise<T> => {
    const response: AxiosResponse<T> = await instance.get<T>(url, { params });
    return response.data;
};

export const postRequest = async <T = any>(url: string, data: any): Promise<T> => {
    const response: AxiosResponse<T> = await instance.post<T>(url, data);
    return response.data;
};

export const putRequest = async <T = any>(url: string, data: any): Promise<T> => {
    const response: AxiosResponse<T> = await instance.put<T>(url, data);
    return response.data;
};

export const patchRequest = async <T = any>(url: string, data: any): Promise<T> => {
    const response: AxiosResponse<T> = await instance.patch<T>(url, data);
    return response.data;
};

export const deleteRequest = async <T = any>(url: string): Promise<T> => {
    const response: AxiosResponse<T> = await instance.delete<T>(url);
    return response.data;
};