import axios, { AxiosRequestConfig } from "axios";



interface IResponseType<T> {
    error: number,
    data: T,
    message: string
}

export function request<T>(config: AxiosRequestConfig) {
    // 创建axios实例
    const instance = axios.create({
        baseURL: 'http://localhost:3000',
        timeout: 3 * 1000,

    })

    //axios拦截器
    // 请求拦截
    instance.interceptors.request.use(config => {
        return config
    }, err => { })

    // 相应拦截
    instance.interceptors.response.use(config => {
        return config
    }, err => { })

    // 发送请求
    return instance.request<IResponseType<T>>(config)
}