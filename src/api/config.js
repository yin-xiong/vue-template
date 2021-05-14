const BASE_API = {
    development: { // 开发环境
        base: `localhost:5000/api`
    },
    production: { // 生产环境
        base: `http://192.168.1.199:3000/`
    }
}

const baseUrl = BASE_API[process.env.NODE_ENV]

export default baseUrl
