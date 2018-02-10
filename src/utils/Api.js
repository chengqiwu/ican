import axios from 'axios'
const url = 'http://47.104.81.112:8080/ican_n'
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