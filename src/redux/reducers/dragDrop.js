import { SHOWDRAGDROP, HIDENDRAGDROP } from '_redux/actions/dragDrop'
const dragDropState = {
  title: null,
  node: null,
  show: false
}
function dragDropReducer(state = dragDropState, action) {
    
  switch (action.type) {
  case SHOWDRAGDROP:
    console.log(action)
    return {
      ...state,
      ...action.object,
      show: true
    }
  case HIDENDRAGDROP:
    return {
      title: null,
      node: null,
      show: false
    }
  default:
    return state
  }
}
export default dragDropReducer