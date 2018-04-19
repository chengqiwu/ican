import { SETMESSAGE, setMessage } from '_redux/actions/message'
import message from '../init/message'
const messageState = {
    criosAndVarietiesList: message.criosAndVarietiesList,
    soilTypes: message.soilTypes,
}

export default function messageReducer(state = messageState, action) {
    switch (action.type) {
    case SETMESSAGE:
        console.log({
            ...state,
            ...action.message
        })
        return {
            ...state,
            ...action.message
        }
    default:
        return state
    }
}