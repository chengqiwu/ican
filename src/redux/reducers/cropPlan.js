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
  UPDATEALL,
} from '_redux/actions/cropPlan'

const defaultState = {
  contrast: [],
  origin: [],
  contrastStats: {
    nitrogen: 0,
    phosphorus: 0,
    potassium: 0,
    sulfur: 0,
    zinc: 0,
    boron: 0,
  },
  originStats: {
    nitrogen: 0,
    phosphorus: 0,
    potassium: 0,
    sulfur: 0,
    zinc: 0,
    boron: 0,
  },
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
  case UPDATEALL:
    return {
      ...state,
      contrast: action.contrast,
      contrastStats: action.contrast.reduce((a, b) => {
        return {
          nitrogen: Number(a.nitrogen) * Number(a.dosage) /100 + Number(b.nitrogen) * Number(b.dosage) /100,
          phosphorus: Number(a.phosphorus) * Number(a.dosage) /100 + Number(b.phosphorus) * Number(b.dosage) /100,
          potassium: Number(a.potassium) * Number(a.dosage)  /100+ Number(b.potassium) * Number(b.dosage) /100,
          sulfur: Number(a.sulfur) * Number(a.dosage) /100 + Number(b.sulfur) * Number(b.dosage) /100,
          zinc: Number(a.zinc) * Number(a.dosage)  /100+ Number(b.zinc) * Number(b.dosage) /100,
          boron: Number(a.boron) * Number(a.dosage) /100 + Number(b.boron) * Number(b.dosage) /100,
          dosage: 100
        }
      }, {
        nitrogen: 0,
        phosphorus: 0,
        potassium: 0,
        sulfur: 0,
        zinc: 0,
        boron: 0,
        dosage: 0,
      }),
      origin: action.origin,
      originStats: action.origin.reduce((a, b) => {
        return {
          nitrogen: Number(a.nitrogen) * Number(a.dosage) /100 + Number(b.nitrogen) * Number(b.dosage) /100,
          phosphorus: Number(a.phosphorus) * Number(a.dosage) /100 + Number(b.phosphorus) * Number(b.dosage) /100,
          potassium: Number(a.potassium) * Number(a.dosage) /100 + Number(b.potassium) * Number(b.dosage) /100,
          sulfur: Number(a.sulfur)* Number(a.dosage) /100 + Number(b.sulfur) * Number(b.dosage) /100,
          zinc: Number(a.zinc)* Number(a.dosage) /100 + Number(b.zinc) * Number(b.dosage) /100,
          boron: Number(a.boron) * Number(a.dosage) /100 + Number(b.boron) * Number(b.dosage) /100,
          dosage: 100
        }
      }, {
        nitrogen: 0,
        phosphorus: 0,
        potassium: 0,
        sulfur: 0,
        zinc: 0,
        boron: 0,
        dosage: 0,
      }),
      schedule: action.schedule,
      targetVo: {
        ...state.targetVo,
        ...action.targetVo
      },
      details: action.details,
      describe: action.describe,
      id: action.id
    }
  case UPDATECONTRAST:
    return {
      ...state,
      contrast: action.contrast,
      contrastStats: action.contrast.reduce((a, b) => {
        return {
          nitrogen: Number(a.nitrogen) * Number(a.dosage)/100 + Number(b.nitrogen) * Number(b.dosage)/100,
          phosphorus: Number(a.phosphorus) * Number(a.dosage)/100 + Number(b.phosphorus) * Number(b.dosage)/100,
          potassium: Number(a.potassium) * Number(a.dosage)/100 + Number(b.potassium) * Number(b.dosage)/100,
          sulfur: Number(a.sulfur) * Number(a.dosage) /100+ Number(b.sulfur) * Number(b.dosage)/100,
          zinc: Number(a.zinc) * Number(a.dosage) /100+ Number(b.zinc) * Number(b.dosage/100),
          boron: Number(a.boron) * Number(a.dosage)/100 + Number(b.boron) * Number(b.dosage)/100,
          dosage: 100
        }
      }, {
        nitrogen: 0,
        phosphorus: 0,
        potassium: 0,
        sulfur: 0,
        zinc: 0,
        boron: 0,
        dosage: 0,
      }),
    }
  case UPDATEORIGIN:
    return {
      ...state,
      origin: action.origin,
      originStats: action.origin.reduce((a, b) => {
        return {
          nitrogen: Number(a.nitrogen) * Number(a.dosage)/100 + Number(b.nitrogen) * Number(b.dosage)/100,
          phosphorus: Number(a.phosphorus) * Number(a.dosage)/100 + Number(b.phosphorus) * Number(b.dosage)/100,
          potassium: Number(a.potassium) * Number(a.dosage)/100 + Number(b.potassium) * Number(b.dosage)/100,
          sulfur: Number(a.sulfur)* Number(a.dosage)/100 + Number(b.sulfur) * Number(b.dosage)/100,
          zinc: Number(a.zinc)* Number(a.dosage)/100 + Number(b.zinc) * Number(b.dosage)/100,
          boron: Number(a.boron) * Number(a.dosage)/100 + Number(b.boron) * Number(b.dosage)/100,
          dosage: 100
        }
      }, {
        nitrogen: 0,
        phosphorus: 0,
        potassium: 0,
        sulfur: 0,
        zinc: 0,
        boron: 0,
        dosage: 0,
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