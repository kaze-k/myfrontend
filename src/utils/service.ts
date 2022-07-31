import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage, ElLoading } from 'element-plus'
import { getToken } from './token'
import router from '@/router'

const service = axios.create({
    timeout: 3000,
    baseURL: '/api'
})

// 请求拦截器
service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        // 在发送请求之前做的事
        // ElLoading.service({ fullscreen: true })
        const token = getToken('token')
        const username = getToken('username')
        if (token) {
            config.headers = {
                ...config.headers,
                token,
                username
            }
        }
        return config
    },
    (error) => {
        // 对请求错误时做的事
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    (response: AxiosResponse<any>) => {
        // 对响应数据做的事
        // ElLoading.service().close()
        if (response.status !== 200) {
            ElMessage({ message: "服务器错误：" + response.status, type: 'warning', center: true })
            router.push("/login")
        }
        return response
    },
    (error) => {
        // 响应错误时做的事
        return Promise.reject(error)
    }
)

export default service