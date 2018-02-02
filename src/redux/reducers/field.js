import { SAVEFIELD, STARTFIELD } from '_redux/actions/field'
const fieldState = {
    name: null,
    start: false
}
function fieldReducer(state = fieldState, action) {
    switch (action.type) {
    case SAVEFIELD:
        return {
            ...state,
            name: action.name
        }
    case STARTFIELD:
        return {
            ...state,
            start: true
        }
    default:
        return state
    }
}
export default fieldReducer