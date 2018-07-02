import polygon from './reducers/polygon'
import feature from './reducers/feature'
import map from './reducers/map'
import dragDrop from './reducers/dragDrop'
import picture from './reducers/picture'
import field from './reducers/field'
import fieldMessage from './reducers/fieldMessage'
import message from './reducers/message'
import user from './reducers/user'

import { combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form'

const reducer = combineReducers({
    polygon,
    map,
    // field: map,
    picture,
    dragDrop,
    feature,
    form: reduxFormReducer,
    fieldMessage,
    message,
    user
})
export default reducer