import {
  UPDATECONTRAST,
  UPDATEORIGIN,
  UPDATESCHEDULE,
  UPDATETARGETVO,
  UPDATEDETAIL,
  UPDATEUNIT,
  UPDATEDESCRIBE,
  DELSCHEDULE,
  UPDATEID,
} from '_redux/actions/cropPlan'

const defaultState = {
  contrast: [],
  origin: [],
  contrastStats: [],
  originStats: [],
  schedule: [],
  targetVo: {
    nitrogen: 0,
    phosphorus: 0,
    potassium: 0,
    sulfur: 0,
    zinc: 0,
    boron: 0,
  },
  details: {},
  prevUnit: 0,
  unit: 0,
  delSchedule: [],
  id: undefined
}

export default function cropPlanReducer(state = defaultState, action) {
  switch (action.type) {
  case UPDATECONTRAST:
    return {
      ...state,
      contrast: action.contrast,
      contrastStats: action.contrast.reduce((a, b) => {
        return {
          nitrogen: Number(a.nitrogen || 0) + Number(b.nitrogen || 0),
          phosphorus: Number(a.phosphorus || 0) + Number(b.phosphorus || 0),
          potassium: Number(a.potassium || 0) + Number(b.potassium || 0),
          sulfur: Number(a.sulfurv || 0) + Number(b.sulfur || 0),
          zinc: Number(a.zinc || 0) + Number(b.zinc || 0),
          boron: Number(a.boron || 0) + Number(b.boron || 0),
        }
      }, {
        nitrogen: 0,
        phosphorus: 0,
        potassium: 0,
        sulfur: 0,
        zinc: 0,
        boron: 0,
      })
    }
  case UPDATEORIGIN:
    return {
      ...state,
      origin: action.origin,
      originStats: action.origin.reduce((a, b) => {
        return {
          nitrogen: Number(a.nitrogen || 0) + Number(b.nitrogen || 0),
          phosphorus: Number(a.phosphorus || 0) + Number(b.phosphorus || 0),
          potassium: Number(a.potassium || 0) + Number(b.potassium || 0),
          sulfur: Number(a.sulfur || 0) + Number(b.sulfur || 0),
          zinc: Number(a.zinc || 0) + Number(b.zinc || 0),
          boron: Number(a.boron || 0) + Number(b.boron || 0),
        }
      }, {
        nitrogen: 0,
        phosphorus: 0,
        potassium: 0,
        sulfur: 0,
        zinc: 0,
        boron: 0,
      })
    }
  case UPDATESCHEDULE:
    return {
      ...state,
      schedule: action.schedule,
    }
  case UPDATETARGETVO:
    return {
      ...state,
      targetVo: {
        ...state.targetVo,
        ...action.targetVo
      }
    }
  case UPDATEDETAIL:
    return {
      ...state,
      details: action.details
    }
  case UPDATEUNIT:
    return {
      ...state,
      prevUnit: state.unit,
      unit: action.unit,
    }
  case UPDATEDESCRIBE:
    return {
      ...state,
      describe: action.describe
    }
  case DELSCHEDULE: 
    return {
      ...state,
      delSchedule: [
        ...state.delSchedule,
        action.schedule
      ]
    }
  case UPDATEID:
    return {
      ...state,
      id: action.id
    }
  default:
    return state
  }
} 