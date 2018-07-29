export const UPDATE = 'MYFIELD/FEATURE'


export function updateFeature(object) {
  return { type: UPDATE, object }
}