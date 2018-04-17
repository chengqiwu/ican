import axios from 'axios'
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
import qs from 'qs'
const url = 'http://192.168.1.23:8080/ican_n'
export function userRegister(data) {
    console.log(data)    
    return axios.get(url + '/api/user/register', {
        params: data
    })
}
 
export function userVerify(data) {
    console.log(data)    
    return axios.get(url + '/api/user/verifySuccess', {
        params: data
    })
}

export function userLogin(data) {
    console.log(data)
    return axios.get(url+'/api/user/login', {
        params: data
    })
}
function getToken() {
    const { token } = JSON.parse(localStorage.getItem('state'))
    return token    
}

export function getUserInfo() {
    
    const { username, role, icon, phone, email } = JSON.parse(localStorage.getItem('state'))
    return { username, role, icon, phone, email }    
}
export function farmLandSave(data) {
    data = {
        ...data,
        token: getToken()
    }
    console.log(data)
    
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

export function updateUserInfo(data) {
    let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
    }
    console.log('data', data)
    return axios.post(url + '/api/user/updateUserInfo?token='+getToken(), data, config)
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

export function findCriosAndVarietiesList() {
    return axios.get(url + '/api/crops/findCriosAndVarietiesList')
}

export function findSoilList() {
    return axios.get(url + '/api/soil/findAllList')
}

export function findPestsByCropsId(id) {
    return axios.post(url +'/api/diseasePests/findByCropsId', {
        cropsId: id
    })
}

export function findReasonById(data) {
    return axios.get(url + '/api/quarterCrops/findById?token=' + getToken(), {
        params: data
    })
}

export function saveSeasonInfo(landInfo) {
    console.log(landInfo)
    let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
    }
    return axios.post(url + '/api/quarterCrops/saveInfo?token='+getToken(), 
        landInfo, config)
}