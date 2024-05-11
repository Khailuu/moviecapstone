import axios, { InternalAxiosRequestConfig, CreateAxiosDefaults } from 'axios'
import { TOKEN_CYBERSOFT } from './api'

export const apiInstance = {
    create: (configDefault?: CreateAxiosDefaults) => {
        const api = axios.create(configDefault)
        api.interceptors.request.use((config) => {
            return {
                ...config,
                headers: {
                    TokenCybersoft: TOKEN_CYBERSOFT
                },
            } as unknown as InternalAxiosRequestConfig
        })
        console.log(api)

        return api
    },
}
