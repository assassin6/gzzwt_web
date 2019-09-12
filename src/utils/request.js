import Axios from 'axios'
import Config from '../config/app.js'

let service = Axios.create({
    baseURL: `${Config.apiUrl}/${Config.apiPrefix}`,
    headers: { Authorization: localStorage.getItem('token') || '' },
    timeout: Config.timeout,
    withCredentials: true
})


service.interceptors.request.use(
    (config) => {
        config.headers['token'] = localStorage.getItem('token')
        if (config.method === 'get') {
            if (config.params) config.params['timeStamp'] = new Date().getTime()
            else config.params = { timeStamp: new Date().getTime() }
        }
        return config
    },
    (error) => {
        Promise.reject(error)
    }
)

service.interceptors.response.use(
    (response) => {
        const { data } = response
        if (data.code === 9) { // 登录失效
            setTimeout(() => {
                if (window.rn) {
                    rn.app.logout()
                } else {
                    // 直接登陆
                    // login().then(({ data: { accessToken } }) => {
                    //     localStorage.setItem('Authorization', accessToken)
                    // })
                }
            }, 1000)
        } else if (response.status !== 200 || data.code != 200) {
            if (!data.msg) return Promise.reject({ msg: '请求失败 请重试' })
            else return Promise.reject(data)
        }
        return data
    },
    (error) => {
        if (!error || !error.msg) {
            return Promise.reject({ msg: '请求失败 请重试' })
        } else if (error.message === `timeout of ${Config.timeout}ms exceeded`) {
            return Promise.reject({msg: '请求超时 请重试'})
        } else {
            return Promise.reject(error)
        }
    }
)

const login = () => service.post('/user/mobile-login', { mobilePhone: 15112368126, dynamicVerifyCode: 432122 })

// 临时登录
if (!localStorage.getItem('token') && !window.rn) {
    login().then(({ data: { accessToken}}) => {
        localStorage.setItem('token', accessToken)
        location.reload()
    })
}



export default service
