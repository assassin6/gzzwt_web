const devApiUrl = 'http://120.77.101.227:3000'
const proApiUrl = 'https://test.njzdzk.com'
const nodeDevEnv = process.env.NODE_ENV === 'development'

export default {
    apiUrl: nodeDevEnv ? devApiUrl : proApiUrl, // 请求地址
    apiPrefix: 'mock/23/api',
    imagePrefix: 'https://7lve-image.7lve.cn',
    domain: 'http://tfn.njzdzk.com',
    timeout: 12000, // 请求超时时间
    designSize: 375, // 设计稿宽度 375
    baseSize: 37.5,
    version: '2019081971124', // 前端版本
    uploadUrl:'https://upload-z2.qiniup.com',// 七牛云上传url
}
