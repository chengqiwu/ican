import polygon from './reducers/polygon'
import feature from './reducers/feature'
import map from './reducers/map'
import field from './reducers/field'
import fieldMessage from './reducers/fieldMessage'
import { combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form'

const reducer = combineReducers({
    polygon: polygon,
    map: map,
    // field: map,
    feature: feature,
    form: reduxFormReducer,
    fieldMessage: fieldMessage
})
export default reducer