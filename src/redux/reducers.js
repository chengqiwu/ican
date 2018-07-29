import polygon from './reducers/polygon'
import feature from './reducers/feature'
import map from './reducers/map'
import dragDrop from './reducers/dragDrop'
import picture from './reducers/picture'
import userFeature from './reducers/userFeature'
import fieldMessage from './reducers/fieldMessage'
import message from './reducers/message'
import user from './reducers/user'
import plantingSeason from './reducers/plaintingSeason'
import { combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form'

const reducer = combineReducers({
  polygon,
  map,
  // field: map,
  userFeature,
  picture,
  dragDrop,
  feature,
  form: reduxFormReducer,
  fieldMessage,
  message,
  user,
  plantingSeason
})
export default reducer