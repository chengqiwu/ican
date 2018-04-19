export const SETMESSAGE = 'message/SETMESSAGE'

export const setMessage = function(message) {
    return { type: SETMESSAGE, message }
}