import { UPDATE, REMOVE, ADD } from '_redux/actions/userFeature'
import ol from 'openlayers'
const featureState = {
  fields: [],
  remove: []
}
function featureReducer(state = featureState, action) {
  console.log(action)

  switch (action.type) {
  case UPDATE:
    return {
      ...state,
      fields: action.object,
    }
  case REMOVE:
    console.log('REMOVE')
    const filter = state.fields.filter(field => field.id.replace('tb_farmland.', '') === action.item)
    return {
      fields: state.fields.filter(field => field.id.replace('tb_farmland.', '') !== action.item),
      remove: [...state.remove, ...filter]
    }
  case ADD:
    console.log('add')
    if (action.item) {
      const feature = (new ol.format.GeoJSON()).writeFeature(action.item,  { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' })
      console.log(feature)
      return {
        fields: [...state.fields, JSON.parse(feature)],
        remove: state.remove
      }
    }
    const filter1 = state.remove.filter(field => field.id.replace('tb_farmland.', '') === action.item)
    console.log(filter1)
    console.log([...state.fields, ...filter1])
    console.log(state.remove.filter(field => field.id.replace('tb_farmland.', '') !== action.item))
    return {
      fields: [...state.fields, ...filter1],
      remove: state.remove.filter(field => field.id.replace('tb_farmland.', '') !== action.item)
    }
  default:
    return state
  }
}
export default featureReducer