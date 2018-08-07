import { SHOWLIST, UPDATELISTS } from '_redux/actions/picture'

const pictureState = {
  lists: [],
  show: false,
  update: false,
  name: 'picture'
}

function pictureReducer (state= pictureState, action) {
  switch (action.type) {
  case SHOWLIST:
    return {
      ...state,
      show: action.show
    }
    break
  case UPDATELISTS:
    return {
      ...state,
      lists: action.lists
    }
    break
  default:
    return state
  }
}

export default pictureReducer 

