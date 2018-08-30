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
  return axios.get(url + '/api/user/login', {
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
  return JSON.parse(sessionStorage.getItem('state'))
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
// export function getUserIcon() {
//     return getUserInfo().icon
// }
export function getUserBasicInfo() {
  const { username, name, address, companyName, companyLogo } = getUserInfo()

  return { username, name, address, companyName, companyLogo }
}

export function getUserInfo2() {
  return axios.get(url + '/api/user/getUserInfo?token=' + getToken())
}

export function farmLandSave(data) {
  return axios.post(`${url}/api/farmLand/save?token=${getToken()}`, data)
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
  return axios.post(url + '/api/diseasePests/findByCropsId', image)
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
  return axios.post(url + '/api/quarterCrops/saveInfo?token=' + getToken(),
    landInfo, config)
}

export function updateIcon(ican) {
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
    // headers: {
    //     'Content-Type': 'multipart/form-data',},
    // withCredentials: true
  }
  return axios.post(url + '/api/farmlandLog/save?token=' + getToken(), farmLandLog, config)
}
// 	api/farmlandLog/delete
export function farmLandLogDelete(logId) {
  return axios.post(`${url}/api/farmlandLog/delete?token=${getToken()}`, logId)
}

// 	api/logPhoto/findList

export function findLogPhotoList(params) {
  return axios.post(url + '/api/logPhoto/findList?token=' + getToken(), params)
}
export function findlandLogList(params) {
  return axios.post(url + '/api/farmlandLog/findList?token=' + getToken(), params)
}
export function getUserIcon() {
  return `${url}/api/user/downLoadUserIcon?token=${getToken()}&timestemp=${Date.now()}`
}
export function findLogPhotoById(params) {
  return axios.post(`${url}/api/logPhoto/findByLogId?token=${getToken()}`, params)
}
export function findLogVideoById(params) {
  return axios.post(`${url}/api/logVideo/findByLogId?token=${getToken()}`, params)
}
export function deleteLogPhotoById(id) {
  return axios.post(`${url}/api/logPhoto/delete?token=${getToken()}`, id)
}
export function deleteLogVideoById(id) {
  return axios.post(`${url}/api/logVideo/delete?token=${getToken()}`, id)
}

export function findSeasonLists() {
  return axios.post(`${url}/api/season/findAllList`)
}

export function findPlantingSeasonList(landId) {
  return axios.post(`${url}/api/plantingSeason/findList?token=${getToken()}`, landId)
}
// > api/plantingSeason/save

export function plantingSeasonSave(info) {
  return axios.post(`${url}/api/plantingSeason/save?token=${getToken()}`, info)
}
// 	api/plantingSeasonCrops/findList
export function findPlantingSeasonCrops(plantingSeasonId) {
  return axios.post(`${url}/api/plantingSeasonCrops/findList?token=${getToken()}`, plantingSeasonId)
}
// 	api/plantingSeasonCrops/save
export function plantingSeasonCropsSave(info) {
  return axios.post(`${url}/api/plantingSeasonCrops/save?token=${getToken()}`, info)
}
export function plantingSeasonCropsDelete(id) {
  return axios.post(`${url}/api/plantingSeasonCrops/delete?token=${getToken()}`, id)
}
export function setInSeason(info) {
  return axios.post(`${url}/api/plantingSeason/inSeason?token=${getToken()}`, info)
}
// > api/plantingSeason/delete

export function deleteSeason(info) {
  return axios.post(`${url}/api/plantingSeason/delete?token=${getToken()}`, info)
}
// > api/soilLand/save
export function soilLandSave(info) {
  return axios.post(`${url}/api/soilLand/save?token=${getToken()}`, info)
}
// > api/environmentFacilities/save

export function envirFacSave(info) {
  return axios.post(`${url}/api/environmentFacilities/save?token=${getToken()}`, info)
}

export function findDiseasePestList () {
  return axios.post(`${url}/api/diseasePests/findAllList?token=${getToken()}`)
}
// 	api/croppingPattern/findByCropsId
export function findCroppingPatternList (cropsId) {
  return axios.post(`${url}/api/croppingPattern/findByCropsId?token=${getToken()}`, cropsId)
}

// 	api/soilLand/findByLandId
export function findsoilLandList (landId) {
  return axios.post(`${url}/api/soilLand/findByLandId?token=${getToken()}`, landId)
}
// api/soilLand/delete?token=&id=
export function deleteSoilLand(soilLand) {
  return axios.post(`${url}/api/soilLand/delete?token=${getToken()}`, soilLand)
}
// 	api/environmentFacilities/findByLandId
export function findEnvirFac (landId) {
  return axios.post(`${url}/api/environmentFacilities/findByLandId?token=${getToken()}`, landId)
}
// 	api/soilLand/deleteFile
export function deleteSoilLandFile(info) {
  return axios.post(`${url}/api/soilLand/deleteFile?token=${getToken()}`, info)
}
// api/plantingSeasonCrops/delete?token=&id=

// api/plantingSeasonCropsFertilizer/delete?token=&id=
export function plantingSeasonCropDelete (id) {
  return axios.post(`${url}/api/plantingSeasonCropsFertilizer/delete?token=${getToken()}`, id)
}

// api/farmLand/getTotalArea

export function farmLandTotalArea() {
  return axios.post(`${url}/api/farmLand/getTotalArea`)
}
// 	api/farmLand /updateSort
export function farmLandUpdateList(content) {
  return axios.post(`${url}/api/farmLand/updateSort?token=${getToken()}`, content)
}
// 	api/farmLand/findList
export function farmLandLists () {
  return axios.post(`${url}/api/farmLand/findList?token=${getToken()}`)
}
// 	api/user/validatePassword
export function validatePassword(password) {
  return axios.post(`${url}/api/user/validatePassword?token=${getToken()}`, password)
}
// 	api/plantingSeasonCropsFertilizer/save
export function fertilizerSave(fertilizerStr) {
  return axios.post(`${url}/api/plantingSeasonCropsFertilizer/save?token=${getToken()}`, fertilizerStr)
}
// 	api/plantingSeasonCropsFertilizer/get
export function getFertilizer(id) {
  return axios.post(`${url}/api/plantingSeasonCropsFertilizer/get?token=${getToken()}`, id)
}