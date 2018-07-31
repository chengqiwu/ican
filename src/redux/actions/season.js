export const UPDATE = 'plantingSeason/UPDATE'

export function updateSeason(season) {
  return { type: UPDATE, season}
}
