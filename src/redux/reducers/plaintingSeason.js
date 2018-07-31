import { SHOWSEASON, UPDATESEASON, DESTORYSEASON} from '_redux/actions/plaintingSeason'

const defaultState = {
  show: false,
  plaintSeason: null
}
export default function plantingSeason(state = defaultState, action) {
  switch (action.type) {
  case SHOWSEASON:
    return {
      show: true,
      plaintSeason: action.plantingSeason
    }
  case UPDATESEASON:
    return {
      show: true,
      plaintSeason: action.plantingSeason
    }
  case DESTORYSEASON:
    return {
      show: false,
      plaintSeason: null
    }
  default:
    return state
  }
}