export const UPDATECONTRAST = 'CROPPLAN/UPDATECONTRAST'
export const UPDATEORIGIN = 'CROPPLAN/UPDATEORIGIN'
export const UPDATESCHEDULE = 'CROPPLAN/UPDATESCHEDULE'
export const UPDATETARGETVO = 'CROPPLAN/UPDATETARGETVO'
export const UPDATEDETAIL = 'CROPPLAN/UPDATEDETAIL'
export const UPDATEUNIT = 'CROPPLAN/UPDATEUNIT'
export const UPDATEDESCRIBE = 'CROPPLAN/UPDATEDECRIBE'
export const DELSCHEDULE = 'CROPPLAN/DELSCHEDULE'
export const UPDATEID = 'CROPPLAN/UPDATEID'
// contrast
// origin

export function updateContrast (contrast) {
  return {
    type: UPDATECONTRAST,
    contrast
  }
}

export function updateOrigin(origin) {
  return {
    type: UPDATEORIGIN,
    origin
  }
}
export function updateSchedule(schedule) {
  return {
    type: UPDATESCHEDULE,
    schedule
  }
}

export function updateTargetVo(targetVo) {
  return {
    type: UPDATETARGETVO,
    targetVo
  }
}

export function updateDetail(details) {
  return {
    type: UPDATEDETAIL,
    details
  }
}

export function updateUnit(unit) {
  return {
    type: UPDATEUNIT,
    unit
  }
}

export function updateDescribe(describe) {
  return {
    type: UPDATEDESCRIBE,
    describe
  }
}

export function delSchedule(schedule) {
  return {
    type: DELSCHEDULE,
    schedule
  }
}

export function updateId(id) {
  return {
    type: UPDATEID,
    id,
  }
}