const axios = require("axios")

async function fecthAPIGames(url, count) {
  try {
    let juegos = [];
    if (count === 0) return juegos;
    const response = await axios.get(url);
    juegos = response.data.results;
    if (response.data.next) return juegos.concat(await fecthAPIGames(response.data.next, count - 1));
  } catch (error) {
    return error;
  }
}

function fecthAPIGamesFinal(datos) {
  let results = datos.map(v => {
    let videogame = {
      ID: v.id,
      name: v.name,
      Rating: v.rating,
      Plataformas: v.parent_platforms.map((platform) => platform.platform.name),
      img: v.background_image,
      genros: v.genres.map(g => g.name)
    }
    return videogame;
  })
  return results;
}

module.exports = {
  fecthAPIGamesFinal,
  fecthAPIGames,
};