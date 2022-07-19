const axion = require("axios")
const { YOUR_API_KEY } = process.env;

async function getGameId(idVi) {

  const searchPorId = await axion.get(`https://api.rawg.io/api/games/${idVi}?key=${YOUR_API_KEY}`)
  const { name, description_raw, genres, platforms, id, rating, background_image, released } = searchPorId.data;
  const genresFinal = genres.map(g => g.name)
  const platformsFinal = platforms.map(p => p.platform.name)

  const game = {
    id,
    name,
    description_raw,
    background_image,
    rating,
    released,
    genresFinal,
    platformsFinal
  };
  return game;
}

module.exports = { getGameId };