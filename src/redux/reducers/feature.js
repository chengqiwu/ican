import {
    SAVEFEATURE, SETFETAURE, SELECTFEATURE, FROMFEATURE, GETFEATURE,
    saveFeature, setFeature, selectFeature, fromEATURE, getFeature } from '_redux/actions/feature.js'

const featureState = {
    feature: null,
    flag: false,
    id: undefined,
    name: undefined,
    isNew: 1,
    growthStatus: undefined
}

function featureReducer(state = featureState, action) {
    switch (action.type) {
    case SAVEFEATURE:
        return {
            ...state,
            feature: action.feature
        }
    case SETFETAURE:
        return {
            ...state,
            ...action.config
        }
    case GETFEATURE:
        return state
    case SELECTFEATURE:
        return {
            ...state,
            feature: action.feature
        }
    case FROMFEATURE: 
        return {
            ...state,
            flag: action.flag
        }
    default:
        return state
    }
}
export default featureReducer