export const SETFIELDMESSAGE = 'fieldMessage/SETFIELDMESSAGE'
export const SHOWFIELDMESSAGE = 'fieldMessage/SHOWFIELDMESSAGE'

export const setFieldMessage = function(message) {
    return { type: SETFIELDMESSAGE, message }
}
export const showFieldMessage = function (flag) {
    return { type: SHOWFIELDMESSAGE, flag }
}