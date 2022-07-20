const axion = require("axios")
const { YOUR_API_KEY } = process.env;

async function getGameId(idVi) {

  const searchPorId = await axion.get(`https://api.rawg.io/api/games/${idVi}?key=${YOUR_API_KEY}`)

  const game = {
    id : searchPorId.data.id,
    name : searchPorId.data.name,
    description : searchPorId.data.description_raw,
    img :searchPorId.data.background_image,
    rating :searchPorId.data.rating,
    released : searchPorId.data.released,
    genres :   searchPorId.data.genres.map(g => g.name),
    platforms :  searchPorId.data.platforms.map(p => p.platform.name)
  };
  return game;
}
module.exports = { getGameId };