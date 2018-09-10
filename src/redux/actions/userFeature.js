export const UPDATE = 'MYFIELD/FEATURE'
export const REMOVE = 'MYFIELD/REMOVE'
export const ADD = 'MYFIELD/ADD'


export function updateFeature(object) {
  return { type: UPDATE, object }
}
export function removeFeature(item) {
  return { type: REMOVE, item }
}
export function addFeature(item) {
  return { type: ADD, item }
}