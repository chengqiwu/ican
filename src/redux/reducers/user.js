import { GETUSERINFO } from '_redux/actions/user'

const userState = {
  username: '',
  role: '0',
  icon: undefined,
  phone: '',
  email: '',
  type: '0',
  name: '',
  id: '',
  address: '',
  companyName: '',
  companyLogo: undefined
}

const userReducer = function(state = userState, action) {
  console.log(123, action)
  switch (action.type) {
  case GETUSERINFO:
    return {
      ...state,
      ...action.payload
    }
  default: 
    return state
  }
}
export default userReducer