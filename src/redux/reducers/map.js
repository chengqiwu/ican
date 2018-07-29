import map from '../init/map'

import { SETTARGET } from '../actions/map'

const mapState = {
  map
}
function mapReducer(state = mapState, action) {
  switch (action.type) {
  case SETTARGET:
    map.setTarget(action.target)
    return state
  default:
    return state
  }
}
export default mapReducer