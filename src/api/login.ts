import { request } from "@/utils/request";

interface IAccountinformationType {
    username: string,
    password: string
}


// 登陆接口 
export function login(params: IAccountinformationType) {
    return request({
        url: '/login',
        data: params,
        method: 'POST'
    })
}