import ol from 'openlayers'
const defaultState = {
  source: new ol.source.Vector(),
  cluster: null
}
const refresh = 'refresh'
function sourceReducer(state = defaultState, action) {
  switch (action.type) {
  case refresh:
    state.source.addFeature(new ol.Feature(new ol.geom.Point(ol.extent.getCenter(action.feature.getGeometry().getExtent()))))
    state.cluster.refresh()
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
