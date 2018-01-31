import map from '../init/map'
import { SETTARGET } from '../actions/map'
function mapReducer (state = { map }, action) {
    switch (action.type) {
    case SETTARGET:
        map.setTarget(action.target)
        return { map }
    default:
        return { map }
    }
}
export default mapReducer