import {REMOVEPOLYGON, ADDPOLYGON} from '../actions/polygon'

const initState = {
    polygon: false
}
export default function polygonReduce(state = {initState}, action){
    switch (action.type) {
    case ADDPOLYGON:
        return { polygon: true }
    case REMOVEPOLYGON:
        return { polygon: false }   
    default:
        return state
    }
}