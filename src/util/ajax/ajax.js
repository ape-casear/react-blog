import axios from 'axios'
import { apiUrl } from '../../config/base'
// axios配置
const axiosBaseConfig = {
    // baseURL: prefix,
    timeout: 10000,
    headers: { 'Content-Type': 'text/plain' },

    // 跨域请求，是否带上认证信息
    withCredentials: false, // default
    // http返回的数据类型
    // 默认是json，可选'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
    responseType: 'json', // default
    // http请求返回状态码检查
    validateStatus: status =>
      status >= 200 && status < 310, // default
    // 请求数据预处理
    responseEncoding: 'utf8', // default

    transformRequest: [(data, headers) => {
      // 加入token？
      const token = sessionStorage.getItem('ACCESS_TOKEN')
      if (token) {
        headers['ACCESS_TOKEN'] = token;
      }
      // 请求对象转换成json字符串
      if (typeof data === 'object') {
        return JSON.stringify(data)
      }
      return data
    }],
    // 返回数据预处理
    transformResponse: [respData =>
      // 检查返回status值
      // if (typeof respData.status !== 'undefined') {
      //   if (respData.status === 1) {
      //     return respData
      //   }
      //   throw new Error(respData.errMsg || 'respData.status不为0')
      // }
      respData,
    ],
}

const instance = axios.create(axiosBaseConfig)

function request(url, method, Data){
    /* if(params && params.length > 0){
        params.forEach(item=>{
            url = url.replace(':param', item)
        })
    } */

    return instance[method](apiUrl + url, Data)
}

export {
    request
}