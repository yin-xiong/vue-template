import axios from 'axios'
import router from '@/router'
import {clearLoginInfo} from '@/utils'
import {Message} from 'element-ui'
import {setToken} from '@/utils/auth'
import VueCookies from "vue-cookies";
// create an axios instance
axios.defaults.crossDomain = true
const service = axios.create({
    timeout: 60000 // request timeout
})

service.interceptors.request.use(config => {
    // let { method, data } = config
    // if (method === 'post') { // post数据都进行加密处理
    //   config.data = encrypt(data)
    //   config.headers['Content-Type'] = 'application/json'
    // }
    config.headers['Authorization'] = `${VueCookies.isKey("token")}`
    return config
}, error => {
    Promise.reject(error)
})

service.interceptors.response.use(
    response => { // 只会200
        let {data: {code, data, desc}} = response
        if (desc === 'OK') {
            return response.data
        }
        switch (code) {
            case 0:
                return data
            case 203:
                needRefresh(data)
                break
            case 205:
                needRelogin('token无效，请重新登录')
                break
            case 405:
                errorMessage('系统错误')
                break
            case 503:
                errorMessage('网络异常')
                break
        }
        if (code !== 0) {
            return Promise.reject(response.data)
        }
    }, error => {
        console.log(error,'axios-error----------------');
        const request = error.request
        const response = error.response
        if (/^4\d+$/.test(request.status)) {
            if (response && response.data && response.data.message) {
                errorMessage(response.data.message)
            }
        } else if (/^5\d+$/.test(request.status)) {
            errorMessage(error.message)
        } else {
            localStorage.clear()
        }
        return Promise.reject(error)
    })

function success(body) { // 接口请求返回200
    let {success, message, data} = body
    if (success) { // 判断后台业务逻辑是否处理成功
        return data
    }
    errorMessage(message)
    return Promise.reject(message)
}

function errorMessage(message) {
    Message.closeAll()
    Message({message: message, type: 'error', duration: 3 * 1000})
}

function needRelogin(tip) {
    errorMessage(tip)
    clearLoginInfo()
    router.replace({name: 'login'})
}

// 需要重新登录
function needRefresh(body) {
    return new Promise((resolve, reject) => {
        // service({
        //     url: '/aams/oauth/refreshtoken',
        //     method: 'post',
        //     headers: {
        //         tokenId: sessionStorage.getItem('token'),
        //         refreshToken: sessionStorage.getItem('refreshToken')
        //     }
        // }).then(response => {
        //     let {token} = response
        //     sessionStorage.setItem('token', token)
        //     setToken(token)
        //     resolve(body.data) // 继续执行当前的请求
        //     return body.data
        // }).catch(error => {
        //     reject(error)
        // })
    })
}

export default service
