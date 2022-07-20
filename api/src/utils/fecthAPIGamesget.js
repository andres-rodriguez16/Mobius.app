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
function datosTraidosDeLaApi(datos) {
  let results = datos.map(v => {
    let videogame = {
      id: v.id,
      name: v.name,
      rating: v.rating,
      platforms: v.parent_platforms.map((platform) => platform.platform.name),
      img: v.background_image,
      genres: v.genres.map(g => g.name)
    }
    return videogame;
  })
  return results;
}

module.exports = {
  datosTraidosDeLaApi,
  fecthAPIGames,
};