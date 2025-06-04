import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import { message } from 'ant-design-vue'

// 创建axios实例
const request: AxiosInstance = axios.create({
    baseURL: '/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})

// 请求拦截器
request.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// 响应拦截器
request.interceptors.response.use(
    (response: AxiosResponse) => {
        const { data } = response
        console.log(data)
        if (data.code !== 200) {
            message.error(data.msg || '请求失败')
            return Promise.reject(new Error(data.msg || '请求失败'))
        }
        return data
    },
    (error) => {
        message.error(error.message || '请求失败')
        return Promise.reject(error)
    }
)

export default request 