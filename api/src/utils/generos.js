const axios = require("axios")
const { YOUR_API_KEY } = process.env;
const { Genero } = require("../db")

module.exports = {
  async añadirALaDb() {
    const { data } = await axios.get(`https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`)
    const { results } = data;
     results.map(async (genre) => {
      await Genero.findOrCreate({ where: {name: genre.name} })
    })
    console.log("los generos se guardaron en la DB")
  }

}