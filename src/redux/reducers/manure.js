import { SHOWMANURE, UPDATEMANURE, DESTORYMANURE} from '_redux/actions/manure'

const defaultState = {
  show: false,
  manure: null,
  plantingSeasonCropsId: null
}
export default function manure(state = defaultState, action) {
  switch (action.type) {
  case SHOWMANURE:
    return {
      show: true,
      manure: action.manure
    }
  case UPDATEMANURE:
    return {
      show: true,
      manure: action.manure,
      plantingSeasonCropsId: action.plantingSeasonCropsId,
      update: action.update,
      updateNo: action.updateNo,
      pos: action.pos
    }
  case DESTORYMANURE:
    return {
      show: false,
      manure: null
    }
  default:
    return state
  }
}