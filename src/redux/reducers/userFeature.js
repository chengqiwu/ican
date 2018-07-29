import { UPDATE } from '_redux/actions/userFeature'

const featureState = {
  fields: []
}
function featureReducer(state = featureState, action) {
  switch (action.type) {
  case UPDATE:
    return {
      fields: action.object
    }

  default:
    return state
  }
}
export default featureReducer