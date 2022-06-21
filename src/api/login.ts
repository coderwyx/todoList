import { request } from "@/utils/request";

interface IAccountinformationType {
    username: string,
    password: string
}

interface IRequestType {
    error: number,
    message: string,
    data?: any
}

// 登陆接口 
export  function login(params: IAccountinformationType) {
    return request({
        url: '/users/login',
        data:params,
        method: 'POST'
    })
}