import polygon from './reducers/polygon'
import map from './reducers/map'
import field from './reducers/field'

export default function combineReducers(state = {}, action) {
    return {
        polygon: polygon(state.polygon, action),
        map: map(state.map, action),
        field: map(state.field, action)
    }
}