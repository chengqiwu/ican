export const ADDPOLYGON = 'polygon/ADDPOLYGON'
export const REMOVEPOLYGON = 'polygon/REMOVEPOLYGON'

export function addPolygon () {
  return { type: ADDPOLYGON }
}
export function removePolygon () {
  return { type: REMOVEPOLYGON }
}