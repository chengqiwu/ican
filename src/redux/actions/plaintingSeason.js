export const SHOWSEASON = 'plantingSeason/SHOWSEASON'
export const UPDATESEASON = 'plantingSeason/UPDATESEASON'
export const DESTORYSEASON = 'plantingSeason/DESTORYSEASON'


export function showSeason(plantingSeason) {
  return {
    type: SHOWSEASON,
    show: true,
    plantingSeason
  }
}

export function updatePSeason(plantingSeason) {
  return {
    type: UPDATESEASON,
    plantingSeason
  }
}

export function destorySeason() {
  return {
    type: DESTORYSEASON,
    show: false
  }
}