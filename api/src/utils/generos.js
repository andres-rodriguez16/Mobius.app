const axios = require("axios")
const { YOUR_API_KEY } = process.env;
const { Genero } = require("../db")

async function añadirALaDb() {
  try {
    const { data } = await axios.get(`https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`)
    const { results } = data;
     results.map(async (genre) => {
      await Genero.findOrCreate({ where: {name: genre.name} })
    })
    console.log("los generos se guardaron en la DB")
  } catch (error) {
    return error;
  }
  
}

module.exports = {
 añadirALaDb

}