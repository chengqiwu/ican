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

export function addFarmers(data) {
    let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
    }
    console.log('data', data)
    
    axios.post(url + '/api/user/addFarmers?token=' + getToken(), data, config)
}
// const farmersInfo = {
//     loginName: this.state.loginName,
//     password: this.state.password,
//     phone: this.state.phone,
//     name: this.state.name,
//     address: this.state.address
// }
// const formData = new FormData()
// formData.append('icon', this.icon.files[0])
// formData.append('farmersInfo', JSON.stringify(farmersInfo))
// addFarmers(formData)

export function updateFarmers(data) {
    let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
    }
    console.log('data', data)

    axios.post(url + '/api/user/updateFarmers?token=' + getToken(), data, config)
}