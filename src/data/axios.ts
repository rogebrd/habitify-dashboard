import axios from 'axios';

export const client = axios.create({
    // Docker
    baseURL: 'https://api.habitify.me/',
    timeout: 10000,
    headers: {
        Authorization: localStorage.getItem('habitify_token') ? JSON.parse(localStorage.getItem('habitify_token') as string) : ""
    }
});

export const setAuthHeader = (token: any) => {
    client.interceptors.request.use((config: any) => {
        config.headers.Authorization = token;
        return config;
    });
};