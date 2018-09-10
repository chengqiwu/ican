import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import history from 'router/history'
import Cookies from 'js-cookie'
import { apiUrl as url } from '../url'
let base = url

function getToken() {
  const state = sessionStorage.getItem('state')
  const { token } = JSON.parse(state)
  return token
}
// axios.defaults.timeout = 10000
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
axios.interceptors.request.use(config => {
  return config
}, err => {
  toast.error('请求超时', {
    position: toast.POSITION.BOTTOM_CENTER,
    pauseOnHover: false,
    hideProgressBar: true,
  })
  return Promise.resolve(err)
})
// http response 拦截器
axios.interceptors.response.use(response => {
  const data = response.data
  // 根据返回的code值来做不同的处理(和后端约定)
  switch (data.msg) {
  case '201':
    toast.error('系统异常，即将重新登录', {
      position: toast.POSITION.BOTTOM_CENTER,
      pauseOnHover: false,
      hideProgressBar: true,
    })
    sessionStorage.clear()
    Cookies.remove('name', { path: '' })
    history.push('/')
    break
  case '202':
  case '203':
  case '204':
  case '205':
    // 操作失败
    toast.error(data.result, {
      position: toast.POSITION.BOTTOM_CENTER,
      pauseOnHover: false,
      hideProgressBar: true,
    })
    break
  case '206':
  case '207':
  
    // 系统错误
    toast.error('系统异常，即将重新登录', {
      position: toast.POSITION.BOTTOM_CENTER,
      pauseOnHover: false,
      hideProgressBar: true,
    })
    sessionStorage.clear()
    Cookies.remove('name', { path: '' })
    history.push('/')

    break
  case '208':
  case '209':
  case '210':
  case '211':
  case '213':
  case '214':
  case '215':
  case '216':
  case '217':
  case '218':
  case '219':
    // 系统错误
    toast.error(data.result, {
      position: toast.POSITION.BOTTOM_CENTER,
      pauseOnHover: false,
      hideProgressBar: true,
    })

    break
  default:
    return response
  }
  return response
}, (err) => {
  // 这里是返回状态码不为200时候的错误处理
  
  toast.info(err.toString(), {
    position: toast.POSITION.BOTTOM_CENTER,
    pauseOnHover: false,
    hideProgressBar: true,
  })
  return Promise.resolve(err)
})

export const postRequest = (url, params,config ={}) => {
  let accessToken = getToken()
  if (params) {
    return axios.post(`${base}${url}?token=${accessToken}`, params, config)

  }
  return axios.post(`${base}${url}?token=${accessToken}`, config)
}
export const postRequestNoToken = (url, params, config={}) => {
  if (params) {
    return axios.post(`${base}${url}`, params, config)

  }
  return axios.post(`${base}${url}`, config)
}
export const getRequestNoToken = (url, params) => {
  if (params) {
    return axios.get(`${base}${url}`, {
      params
    })

  }
  return axios.get(`${base}${url}`)
}
export const getRequest = (url, params) => {
  let accessToken = getToken()
  if (params) {
    return axios.get(`${base}${url}?token=${accessToken}`, {
      params
    })

  }
  return axios.get(`${base}${url}?token=${accessToken}`)
}