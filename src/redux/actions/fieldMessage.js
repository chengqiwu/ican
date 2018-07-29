export const SETFIELDMESSAGE = 'fieldMessage/SETFIELDMESSAGE'
export const SHOWFIELDMESSAGE = 'fieldMessage/SHOWFIELDMESSAGE'
export const STARTFIELDMESSAGE = 'fieldMessage/STARTFIELDMESSAGE'

export const setFieldMessage = function(message) {
  return { type: SETFIELDMESSAGE, message }
}
export const showFieldMessage = function (show) {
  return { type: SHOWFIELDMESSAGE, show }
}
export const startFieldMessage = function(start) {
  return { type: STARTFIELDMESSAGE, start}
}