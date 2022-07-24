import {
  GET_VIDEOGAMES,
  GET_VIDEOGAMES_POR_ID,
  GET_VIDEOGAME_POR_SEARCH
} from "./actions/action"

const initialState = {
  videoGames: [],
  videoGameDetails: {}
}


function reducerVideoGames(state = initialState, action) {
  if (action.type === GET_VIDEOGAMES) {
    return {
      ...state,
      videoGames: action.payload
    }
  }
  else if (action.type === GET_VIDEOGAMES_POR_ID) {
    return {
      ...state,
      videoGameDetails: action.payload
    }
  }
  else if (action.type === GET_VIDEOGAME_POR_SEARCH) { 
  return {
    ...state,
    videoGames: action.payload
  }

  }else {
    return {
      ...state
    }

  }
}

export default reducerVideoGames;