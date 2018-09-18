import { postRequest, postRequestNoToken, getRequest, getRequestNoToken } from  './exception'
// axios.defaults.withCredentials = true
import axios from 'axios'
import { apiUrl as url } from '../url'
import qs from 'qs'
import jsonp from 'jsonp'
import Cookies from 'js-cookie'
import md5 from 'js-md5'
function updateCookies() {
  console.log(Cookies.get('name'))
  Cookies.set('name', md5(Cookies.get('name')), { path: '/index', expires: 1 / 24 })
}
console.log(postRequestNoToken)
export function getPosition(callback) {
  jsonp('http://api.map.baidu.com/location/ip?ak=PKjiNSEtPtxphfaUacba5mieByhERV6x&coor=bd09ll', null, callback)
}

export function userRegister(data) {
  return getRequestNoToken('/api/user/register', data)
}

export function getVerifyCodeImage() {
  // return getRequest('/api/user/getVerifyCodeImage', data)
  return axios.get(url + '/api/user/getVerifyCodeImage', { responseType: 'blob' })
}
export function verifyCode(verifyCode) {
  return getRequestNoToken('/api/user/verifyCode', verifyCode)
}

export function registerVerify(data) {
  return getRequestNoToken('/api/user/registerVerify', data)
  // return axios.get(url + '/api/user/registerVerify', {
  //   params: data
  // })
}
export function userVerify(data) {
  // console.log(data)
  return getRequestNoToken('/api/user/verifySuccess', data)
  // return axios.get(url + '/api/user/verifySuccess', {
  //   params: data
  // })

}

export function forgetPass(data) {
  return postRequestNoToken('/api/user/retrievePassword', data)
}

export function resetPass(data) {
  return postRequestNoToken('/api/user/restPassword', data)
  // let config = {
  //   headers: { 'Content-Type': 'multipart/form-data' }
  // }
  // return axios.post(url + '/api/user/restPassword', data, config)
}
export function userLogin(data) {
  return getRequestNoToken('/api/user/login', data)
  // console.log(data)
  // return axios.get(url + '/api/user/login', {
  //   params: data
  // })
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
  return getRequest('/api/user/getUserInfo')
}

export function farmLandSave(data) {
  return postRequest('/api/farmLand/save', data)
}

export function farmLandModify(data) {
  return getRequest('/api/farmLand/save',data)
}


export function findFarmers() {

  return getRequest('/api/user/findFarmers')
}

export function getFarmers(data) {
  return postRequest('/api/user/getFarmers', data)
}

export function addFarmers(data) {
  // let config = {
  //   headers: { 'Content-Type': 'multipart/form-data' }
  // }
  // console.log('data', data)
  return postRequest('/api/user/addFarmers', data)
  // return axios.post(url + '/api/user/addFarmers?token=' + getToken(), data, config)
}


export function updateFarmers(data) {
  // let config = {
  //   headers: { 'Content-Type': 'multipart/form-data' }
  // }
  console.log('data', data)
  return postRequest('/api/user/updateFarmers', data)
  // return axios.post(url + '/api/user/updateFarmers?token=' + getToken(), data, config)
}

export function updateContact(data) {
  console.log('data', data)
  let config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  return postRequest('/api/user/updateContact', data)
  // return axios.post(url + '/api/user/updateContact?token=' + getToken(), data)
}

export function findPlanDetails() {
  return postRequest('/api/user/planDetails', data)
  // return axios.post(url + '/api/user/planDetails?token=' + getToken(), data)
}

export function updateContactSuccess(data) {
  console.log('data', data)
  return postRequest('/api/user/updateContactSuccess', data)
  // return axios.post(url + '/api/user/updateContactSuccess?token=' + getToken(), data)
}
export function updateContactEmailSuccess(data) {
  return postRequest('/api/user/updateContactSuccess', data)
  // return axios.post(`${url}/api/user/updateContactSuccess?token=${token}`, data)
}
export function findCriosAndVarietiesList() {
  return getRequestNoToken('/api/crops/findCriosAndVarietiesList')
  // return axios.get(url + '/api/crops/findCriosAndVarietiesList')
}

export function findSoilList() {
  return getRequestNoToken('/api/crops/findAllList')
  // return axios.get(url + '/api/soil/findAllList')
}

export function findPestsByCropsId(id) {
  var image = new FormData()
  image.append('cropsId', id)
  return postRequestNoToken('/api/diseasePests/findByCropsId', image)
  // return axios.post(url + '/api/diseasePests/findByCropsId', image)
}

export function findReasonById(data) {
  getRequest('/api/quarterCrops/findById', data)
  // return axios.get(url + '/api/quarterCrops/findById?token=' + getToken(), {
  //   params: data
  // })
}

export function saveSeasonInfo(landInfo) {
  // console.log(landInfo)
  // let config = {
  //   headers: { 'Content-Type': 'multipart/form-data' }
  // }
  return postRequest('/api/quarterCrops/saveInfo', landInfo)
  // return axios.post(url + '/api/quarterCrops/saveInfo?token=' + getToken(),
  //   landInfo, config)
}

export function updateIcon(ican) {
  // let config = {
  //   headers: { 'Content-Type': 'multipart/form-data' }
  // }
  return postRequest('/api/user/updateIcon', ican)
  // return axios.post(url + '/api/user/updateIcon?token=' + getToken(), ican, config)
}

export function updatePassword(password) {
  return postRequest('/api/user/updatePassword', password)
  // return axios.post(url + '/api/user/updatePassword?token=' + getToken(), password)
}
export function updateUserInfo(userInfo) {
  return postRequest('/api/user/updateUserInfo', userInfo)

  // return axios.post(url + '/api/user/updateUserInfo?token=' + getToken(), userInfo)
}


export function farmLandLogSave(farmLandLog, config) {
  return postRequest('/api/farmlandLog/save', farmLandLog, config)
  
  // return axios.post(url + '/api/farmlandLog/save?token=' + getToken(), farmLandLog, config)
}
// 	api/farmlandLog/delete
export function farmLandLogDelete(logId) {
  return postRequest('/api/farmlandLog/delete', logId)
  // return axios.post(`${url}/api/farmlandLog/delete?token=${getToken()}`, logId)
}

// 	api/logPhoto/findList

export function findLogPhotoList(params) {
  return postRequest('/api/logPhoto/findList', params)
  // return axios.post(url + '/api/logPhoto/findList?token=' + getToken(), params)
}
export function findlandLogList(params) {
  return postRequest('/api/farmlandLog/findList', params)
  // return axios.post(url + '/api/farmlandLog/findList?token=' + getToken(), params)
}
export function getUserIcon() {
  return `${url}/api/user/downLoadUserIcon?token=${getToken()}&timestemp=${Date.now()}`
}
export function findLogPhotoById(params) {
  return postRequest('/api/logPhoto/findByLogId', params)
  // return axios.post(`${url}/api/logPhoto/findByLogId?token=${getToken()}`, params)
}
export function findLogVideoById(params) {
  return postRequest('/api/logVideo/findByLogId', params)
  // return axios.post(`${url}/api/logVideo/findByLogId?token=${getToken()}`, params)
}
export function deleteLogPhotoById(id) {
  return postRequest('/api/logPhoto/delete', id)
  // return axios.post(`${url}/api/logPhoto/delete?token=${getToken()}`, id)
}
export function deleteLogVideoById(id) {
  return postRequest('/api/logVideo/delete', id)
  // return axios.post(`${url}/api/logVideo/delete?token=${getToken()}`, id)
}

export function findSeasonLists() {
  return postRequestNoToken('/api/season/findAllList')
  // return axios.post(`${url}/api/season/findAllList`)
}

export function findPlantingSeasonList(landId) {
  return postRequest('/api/plantingSeason/findList', landId)
  // return axios.post(`${url}/api/plantingSeason/findList?token=${getToken()}`, landId)
}
// > api/plantingSeason/save

export function plantingSeasonSave(info) {
  return postRequest('/api/plantingSeason/save', info)
  // return axios.post(`${url}/api/plantingSeason/save?token=${getToken()}`, info)
}
// 	api/plantingSeasonCrops/findList
export function findPlantingSeasonCrops(plantingSeasonId) {
  return postRequest('/api/plantingSeasonCrops/findList', plantingSeasonId)
  // return axios.post(`${url}/api/plantingSeasonCrops/findList?token=${getToken()}`, plantingSeasonId)
}
// 	api/plantingSeasonCrops/save
export function plantingSeasonCropsSave(info) {
  return postRequest('/api/plantingSeasonCrops/save', info)
  // return axios.post(`${url}/api/plantingSeasonCrops/save?token=${getToken()}`, info)
}
export function plantingSeasonCropsDelete(id) {
  return postRequest('/api/plantingSeasonCrops/delete', id)
  // return axios.post(`${url}/api/plantingSeasonCrops/delete?token=${getToken()}`, id)
}
export function setInSeason(info) {
  return postRequest('/api/plantingSeason/inSeason', info)
  // return axios.post(`${url}/api/plantingSeason/inSeason?token=${getToken()}`, info)
}
// > api/plantingSeason/delete

export function deleteSeason(info) {
  return postRequest('/api/plantingSeason/delete', info)

  // return axios.post(`${url}/api/plantingSeason/delete?token=${getToken()}`, info)
}
// > api/soilLand/save
export function soilLandSave(info) {
  return postRequest('/api/soilLand/save', info)
  // return axios.post(`${url}/api/soilLand/save?token=${getToken()}`, info)
}
// > api/environmentFacilities/save

export function envirFacSave(info) {
  return postRequest('/api/environmentFacilities/save', info)
  // return axios.post(`${url}/api/environmentFacilities/save?token=${getToken()}`, info)
}

export function findDiseasePestList () {
  return postRequest('/api/diseasePests/findAllList')
  // return axios.post(`${url}/api/diseasePests/findAllList?token=${getToken()}`)
}
// 	api/croppingPattern/findByCropsId
export function findCroppingPatternList (cropsId) {
  return postRequest('/api/croppingPattern/findByCropsId', cropsId)
  // return axios.post(`${url}/api/croppingPattern/findByCropsId?token=${getToken()}`, cropsId)
}

// 	api/soilLand/findByLandId
export function findsoilLandList (landId) {
  return postRequest('/api/soilLand/findByLandId', landId)
  // return axios.post(`${url}/api/soilLand/findByLandId?token=${getToken()}`, landId)
}
// api/soilLand/delete?token=&id=
export function deleteSoilLand(soilLand) {
  return postRequest('/api/soilLand/delete', soilLand)
  //return axios.post(`${url}/api/soilLand/delete?token=${getToken()}`, soilLand)
}
// 	api/environmentFacilities/findByLandId
export function findEnvirFac (landId) {
  return postRequest('/api/environmentFacilities/findByLandId', landId)

  // return axios.post(`${url}/api/environmentFacilities/findByLandId?token=${getToken()}`, landId)
}
// 	api/soilLand/deleteFile
export function deleteSoilLandFile(info) {
  return postRequest('/api/soilLand/deleteFile', info)
  // return axios.post(`${url}/api/soilLand/deleteFile?token=${getToken()}`, info)
}
// api/plantingSeasonCrops/delete?token=&id=

// api/plantingSeasonCropsFertilizer/delete?token=&id=
export function plantingSeasonCropDelete (id) {
  return postRequest('/api/plantingSeasonCropsFertilizer/delete', id)
  // return axios.post(`${url}/api/plantingSeasonCropsFertilizer/delete?token=${getToken()}`, id)
}

// api/farmLand/getTotalArea

export function farmLandTotalArea() {
  return postRequestNoToken('/api/farmLand/getTotalArea')
  // return axios.post(`${url}/api/farmLand/getTotalArea`)
}
// 	api/farmLand /updateSort
export function farmLandUpdateList(content) {
  return postRequest('/api/farmLand/updateSort', content)
  // return axios.post(`${url}/api/farmLand/updateSort?token=${getToken()}`, content)
}
// 	api/farmLand/findList
export function farmLandLists () {
  return postRequest('/api/farmLand/findList')
  // return axios.post(`${url}/api/farmLand/findList?token=${getToken()}`)
}
// 	api/user/validatePassword
export function validatePassword(password) {
  return postRequest('/api/user/validatePassword', password)
  
  // return axios.post(`${url}/api/user/validatePassword?token=${getToken()}`, password)
}
// 	api/plantingSeasonCropsFertilizer/save
export function fertilizerSave(fertilizerStr) {

  return postRequest('/api/plantingSeasonCropsFertilizer/save', fertilizerStr)
  // return axios.post(`${url}/api/plantingSeasonCropsFertilizer/save?token=${getToken()}`, fertilizerStr)
}
// 	api/plantingSeasonCropsFertilizer/get
export function getFertilizer(id) {
  return postRequest('/api/plantingSeasonCropsFertilizer/get', id)
  // return axios.post(`${url}/api/plantingSeasonCropsFertilizer/get?token=${getToken()}`, id)
}
// 	api/farmLand/isShow
export function setFarmLandShow(params) {
  return postRequest('/api/farmLand/isShow', params)

  // return axios.post(`${url}/api/farmLand/isShow?token=${getToken()}`, params)
}

export function findSimple(farmlandId) {
  return postRequest('/api/plantingSeasonCrops/findSimpleByNowSeasonCrops', farmlandId)
}

// 	api / findByPlantingSeasonCropsId / save

export function findByPlantingSeasonCropsId(fd) {
  return postRequest('/api/plantingScheme/findByPlantingSeasonCropsId', fd)
}

export function plantingSchemeSave(fd) {
  return postRequest('/api/plantingScheme/save', fd)
}