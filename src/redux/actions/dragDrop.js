export const SHOWDRAGDROP = 'dragdrop/SHOWDRAGDROP'
export const HIDENDRAGDROP = 'dragdrop/HIDENDRAGDROP'


export function showDragDrop(object) {
    return { type: SHOWDRAGDROP, object}
}
export function hidenDragDrop() {
    return { type: HIDENDRAGDROP }
}