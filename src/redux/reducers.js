import polygon from './reducers/polygon'
import map from './reducers/map'

export default function combineReducers(state = {}, action) {
    return {
        polygon: polygon(state.polygon, action),
        map: map(state.map, action)
    }
}