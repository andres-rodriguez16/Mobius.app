const axion = require("axios")
const { YOUR_API_KEY } = process.env;

async function getGameId(idVi) {
  try {
    const searchPorId = await axion.get(`https://api.rawg.io/api/games/${idVi}?key=${YOUR_API_KEY}`)

    const game = {
      id: searchPorId.data.id,
      name: searchPorId.data.name,
      description: searchPorId.data.description_raw,
      img: searchPorId.data.background_image,
      rating: searchPorId.data.rating,
      released: searchPorId.data.released,
      Generos: searchPorId.data.genres?.map(g => g.name),
      platforms: searchPorId.data.platforms?.map(p => p.platform.name)
    };
    let genres = ""
    game.Generos.forEach((el, i) => {
      if (i === game.Generos.length - 1) {
        genres = genres + " " + el
        return;
      }
      genres = genres + ` ${el} -`
    });
    game.Generos = genres

    let platform = ""
    game.platforms.forEach((el, i) => {
      if (i === game.platforms.length - 1) {
        platform = platform + " " + el
        return;
      }
      platform = platform + `  ${el} -`
    });
    game.platforms = platform
  
    
    return game;
  } catch (error) {
    return error;
  }

}
module.exports = { getGameId };