import {getUserInfo2} from 'utils/Api'
export const GETUSERINFO = 'user/GETUSERINFO'

export const getUserInfo = function () {
    // return {
    //     type: GETUSERINFO,
    //     payload: getUserInfo2().then(e => e.data).then(data => data.result)
    // }
    return (dispatch, getState) => {
        getUserInfo2()
            .then(e => e.data)
            .then(data => {
                dispatch({
                    type: GETUSERINFO,
                    payload: data.result
                })
            })
            .catch(error => {
                // dispath: 
                console.log('GET_DATA_FAILED')
            })
    }
}