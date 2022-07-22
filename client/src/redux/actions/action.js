
export const GET_VIDEOGAMES = getVideoGames;
export const GET_VIDEOGAMES_POR_ID = getVideoGamePorId;
export const GET_VIDEOGAME_POR_SEARCH = getVideoGamePorSearch;

export function getVideoGames() {
  return function (dispatch) {
    return fetch(`http://localhost:3001/videogames/`)
      .then(v => v.json())
      .then(v => {
        dispatch({
          type: "GET_ VIDEOGAMES",
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
          type: "GET_VIDEOGAMES_POR_ID",
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
          type: "GET_VIDEOGAME_POR_SEARCH",
          payload: response,
        })
      })
      .catch(e => e)
  }
}