export const SAVEFIELD = 'field/SAVEFIELD'
export const STARTFIELD = 'field/STARTFIELD'


export function saveField(name) {
  return { type: SAVEFIELD, name: name }
}
export function startField() {
  return { type: STARTFIELD }
}