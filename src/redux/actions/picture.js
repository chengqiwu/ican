export const SHOWLIST = 'picture/SHOWLIST'
export const UPDATELISTS = 'picture/UPDATELISTS'

export function showList(show) {
    return {
        type: SHOWLIST,
        show
    }
}
export function updateLists(update) {
    return {
        type: UPDATELISTS,
        update
    }
}