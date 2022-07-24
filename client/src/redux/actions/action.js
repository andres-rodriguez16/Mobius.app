
export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_VIDEOGAMES_POR_ID = "GET_VIDEOGAMES_POR_ID";
export const GET_VIDEOGAME_POR_SEARCH =  "GET_VIDEOGAME_POR_SEARCH";

export function getVideoGames() {
  return function (dispatch) {
    return fetch(`http://localhost:3001/videogames/`)
      .then(v => v.json())
      .then(v => {
        dispatch({
          type: GET_VIDEOGAMES,
          payload: v
        });
      })
      .catch(e => e)
  };
};

export function getVideoGamePorId(id) {
  return function (dispatch) {
    fetch(`http://localhost:3001/videogame/${id}`)
      .then(response => response.json())
      .then(response => {
        dispatch({
          type: GET_VIDEOGAMES_POR_ID,
          payload: response
        })
      })
      .catch(e => e)
  }
}

export function getVideoGamePorSearch(name) {
  return function (dispatch) {
    fetch(`http://localhost:3001/videogames?name=${name}`)
      .then(response => response.json())
      .then(response => {
        dispatch({
          type: GET_VIDEOGAME_POR_SEARCH,
          payload: response,
        })
      })
      .catch(e => e)
  }
}