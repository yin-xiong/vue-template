import request from './request'
import baseUrl from './config.js'
const base = baseUrl.base

// 登录
export function login (params) {
    return request({
        url: `${base}/auth/oauth/token`,
        method: 'get',
        params
    })
}