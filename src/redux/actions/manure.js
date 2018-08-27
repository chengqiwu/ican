export const SHOWMANURE = 'manure/SHOWMANURE'
export const UPDATEMANURE = 'manure/UPDATEMANURE'
export const DESTORYMANURE = 'manure/DESTORYMANURE'


export function showManure(manure) {
  return {
    type: SHOWMANURE,
    show: true,
    manure,
    // plantingSeasonCropsId: 
  }
}

export function updateManure(manure, plantingSeasonCropsId, update, updateNo, pos) {
  return {
    type: UPDATEMANURE,
    manure,
    show: true,
    plantingSeasonCropsId,
    update,
    updateNo,pos
  }
}

export function destoryManure() {
  return {
    type: DESTORYMANURE,
    show: false
  }
}