import polygon from './reducers/polygon'
import feature from './reducers/feature'
import map from './reducers/map'
import field from './reducers/field'
import fieldMessage from './reducers/fieldMessage'
import message from './reducers/message'
import { combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form'

const reducer = combineReducers({
    polygon,
    map,
    // field: map,
    feature,
    form: reduxFormReducer,
    fieldMessage,
    message
})
export default reducer