import axios, { InternalAxiosRequestConfig, CreateAxiosDefaults } from 'axios'
import { TOKEN_CYBERSOFT } from './api'
import { getUserLogin } from 'utils';

export const apiInstance = {
    create: (configDefault?: CreateAxiosDefaults) => {
        const api = axios.create(configDefault)
        api.interceptors.request.use((config) => {
            return {
                ...config,
                headers: {
                    TokenCybersoft: TOKEN_CYBERSOFT,
                    Authorization: "Bearer " + getUserLogin()?.accessToken// Sử dụng userParse ở đây
                },
            } as unknown as InternalAxiosRequestConfig
        })
        return api
    },
}
