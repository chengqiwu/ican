import { farmLandLists } from 'utils/Api'

export const GETMYFIELD = 'myField/GETMYFIELD'
export const SETMYFIELD = 'myField/SETMYFIELD'
// myField/SETMYFIELD
export const UPDATEFIELD = 'myField/UPDATEFIELD'


export function getMyField() {
  return (dispatch, getState) => {
    farmLandLists()
      .then(e => e.data)
      .then(data => {
        dispatch({ type: SETMYFIELD, fields: (data.result || []) })
      })
  }
}
export function setMyField(fields) {
  return {
    type: SETMYFIELD,
    fields
  }
}

export function updateField() {
  return (dispatch, getState) => {
    farmLandLists()
      .then(e => e.data)
      .then(data => {
        dispatch({ type: SETMYFIELD, fields: (data || []) })
      })
  }
}