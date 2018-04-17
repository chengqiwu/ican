export const SAVEFEATURE = 'feature/SAVEFEATURE'
export const SETFETAURE = 'feature/SETFETAURE'
export const SELECTFEATURE = 'feature/SELECTFEATURE'
export const FROMFEATURE = 'feature/FROMFEATURE'
export const GETFEATURE = 'feature/GETFEATURE'

// 1. draw or modify the feature
export function saveFeature(feature) {
    return { type: SAVEFEATURE, feature }
}
// 2. set name and id to the feature 
export function setFeature(config) {
    return { type: SETFETAURE, config }
}  
// 
export function selectFeature(feature) {
    return { type: SELECTFEATURE, feature}
}
export function fromFeature(flag) {
    return { type: FROMFEATURE, flag }
}
export function getFeature() {
    return { type: GETFEATURE }
}