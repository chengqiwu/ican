import {
    SETFIELDMESSAGE, SHOWFIELDMESSAGE,
    setFieldMessage, showFieldMessage } from '_redux/actions/fieldMessage'

const fieldMessageState = {
    message: {},
    flag: false
}
const fieldReducer = function(state = fieldMessageState, action) {
    switch (action.type) {
    case SETFIELDMESSAGE:
        return {
            ...state,
            message: action.message
        }
    case SHOWFIELDMESSAGE:
        console.log(state, action)
        return {
            ...state,
            flag: action.flag
        }
    default:
        return state
    }
}
export default fieldReducer