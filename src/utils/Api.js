import axios from 'axios'
import { apiUrl as url } from '../url'
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.defaults.withCredentials = true
import qs from 'qs'
import jsonp from 'jsonp'
import Cookies from 'js-cookie'
import md5 from 'js-md5'
function updateCookies() {
    console.log(Cookies.get('name'))
    Cookies.set('name', md5(Cookies.get('name')), { path: '/index', expires: 1 / 24 })
}

export function getPosition(callback) {
    jsonp('http://api.map.baidu.com/location/ip?ak=PKjiNSEtPtxphfaUacba5mieByhERV6x&coor=bd09ll', null, callback)
}

export function userRegister(data) {
    console.log(data)    
    return axios.get(url + '/api/user/register', {
        params: data
    })
}

export function getVerifyCodeImage() {
    return axios.get(url + '/api/user/getVerifyCodeImage', { responseType: 'blob' })
}
export function verifyCode(verifyCode) {
    return axios.get(url + '/api/user/verifyCode', {
        params: verifyCode
    })
}

export function registerVerify(data) {
    console.log(data)
    return axios.get(url + '/api/user/registerVerify', {
        params: data
    })
}
export function userVerify(data) {
    console.log(data)    
    return axios.get(url + '/api/user/verifySuccess', {
        params: data
    })
}

export function forgetPass(data) {
    console.log(data)
    let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
    }
    return axios.post(url + '/api/user/retrievePassword', data, config)
}

export function resetPass(data) {
    let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
    }
    return axios.post(url + '/api/user/restPassword', data, config)
}
export function userLogin(data) {
    console.log(data)
    return axios.get(url+'/api/user/login', {
        params: data
    })
}
export function getToken() {
    const state = sessionStorage.getItem('state')
    const { token } = JSON.parse(state)
    return token    
}
export function getUserToken() {
    const state = sessionStorage.getItem('state')
    try {
        const { token } = JSON.parse(state)
        return token
        
    } catch (error) {
        return 
    }
    
}
export function getUserInfo() {
    
    const { username, role, icon, phone, email, id } = JSON.parse(sessionStorage.getItem('state'))
    return { username, role, icon, phone, email, id }    
}
export function getUserName() {
    return getUserInfo().username
}
export function getUserEmail() {
    return getUserInfo().email
}
export function getUserPhone() {
    return getUserInfo().phone
}
export function farmLandSave(data) {
    data = {
        ...data,
        token: getToken()
    }
    console.log(data)
    updateCookies()
    return axios.get(url + '/api/farmLand/save', {
        params: data
    })
}

export function farmLandModify(data) {
    data = {
        ...data,
        token: getToken()
    }
    console.log(data)
    return axios.get(url + '/api/farmLand/save', {
        params: data
    })
}


export function findFarmers() {

    return axios.get(url + '/api/user/findFarmers?token=' + getToken())
}

export function getFarmers(data) {
    let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
    }
    return axios.post(url + '/api/user/getFarmers?token=' + getToken(), data, config)
}

export function addFarmers(data) {
    let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
    }
    console.log('data', data)
    
    return axios.post(url + '/api/user/addFarmers?token=' + getToken(), data, config)
}


export function updateFarmers(data) {
    let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
    }
    console.log('data', data)

    return axios.post(url + '/api/user/updateFarmers?token=' + getToken(), data, config)
}

export function updateContact(data) {
    console.log('data', data)
    let config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    return axios.post(url + '/api/user/updateContact?token=' + getToken(), data)
}

export function findPlanDetails() {
    return axios.post(url + '/api/user/planDetails?token=' + getToken(), data)
}

export function updateContactSuccess(data) {
    console.log('data', data)

    return axios.post(url + '/api/user/updateContactSuccess?token=' + getToken(), data)
}
export function updateContactEmailSuccess(data, token) {
    return axios.post(`${url}/api/user/updateContactSuccess?token=${token}`, data)
}
export function findCriosAndVarietiesList() {
    return axios.get(url + '/api/crops/findCriosAndVarietiesList')
}

export function findSoilList() {
    return axios.get(url + '/api/soil/findAllList')
}

export function findPestsByCropsId(id) {
    var image = new FormData()
    image.append('cropsId', id)
    return axios.post(url +'/api/diseasePests/findByCropsId', image)
}

export function findReasonById(data) {
    updateCookies()
    return axios.get(url + '/api/quarterCrops/findById?token=' + getToken(), {
        params: data
    })
}

export function saveSeasonInfo(landInfo) {
    updateCookies()
    console.log(landInfo)
    let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
    }
    return axios.post(url + '/api/quarterCrops/saveInfo?token='+getToken(), 
        landInfo, config)
}

export function updateIcon (ican) {
    let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
    }
    return axios.post(url + '/api/user/updateIcon?token=' + getToken(), ican, config)
} 

export function updatePassword(password) {
    return axios.post(url + '/api/user/updatePassword?token=' + getToken(), password)
}
export function updateUserInfo(userInfo) {
    return axios.post(url + '/api/user/updateUserInfo?token=' + getToken(), userInfo)
}


export function farmLandLogSave(farmLandLog) {
    let config = {
        headers: {
            'Content-Type': 'multipart/form-data',}
    }
    return axios.post(url + '/api/farmlandLog/save?token=' + getToken(), farmLandLog, config)
}
// 	api/logPhoto/findList

export function findLogPhotoList(params) {
    return axios.post(url + '/api/logPhoto/findList?token=' + getToken(), params)
}