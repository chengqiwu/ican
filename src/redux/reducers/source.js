import ol from 'openlayers'
const defaultState = {
  source: new ol.source.Vector(),
  cluster: null
}
const refresh = 'refresh'
function sourceReducer(state = defaultState, action) {
 
  switch (action.type) {
  case refresh:
    const feature = new ol.Feature(new ol.geom.Point(ol.extent.getCenter(action.feature.getGeometry().getExtent())))
    feature.setId(action.feature.getId())
    state.source.addFeature(feature)
    state.source.refresh()
    return state
  case 'cluster':

    return {
      ...state,
      cluster: action.cluster
    }
  default:
    return state
  }
}
export default sourceReducer
