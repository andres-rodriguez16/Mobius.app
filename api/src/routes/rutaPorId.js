const { Router } = require('express');
const { getGameId } = require('../utils/busquedaPorID');
const {Genero, Videogame} = require("../db")

const router = Router();


router.get("/:idVi", async (req, res) => {

  const { idVi } = req.params;
  try {
    if (idVi.length !== 36) {
      const result = await getGameId(idVi)
      
      res.json(result) 
    } 
   else {
      const busquefaDB = await Videogame.findByPk(idVi,{
        include : Genero
      })
      const videoGame = {
        name : busquefaDB.dataValues.name,
        description : busquefaDB.dataValues.description,
        img :  busquefaDB.dataValues.img,
        rating :  busquefaDB.dataValues.rating,
        released:  busquefaDB.dataValues.released,
        Generos : busquefaDB.dataValues.Generos.map(el => el.name),
        platforms : busquefaDB.dataValues.platforms
      }
      let strFinal = ""
    videoGame.Generos.forEach((genre, i) => {
      if (i === videoGame.Generos.length - 1) {
        strFinal = strFinal + " " + genre
        return;
      }
      strFinal = strFinal + ` ${genre} -`
    });
    let platformFinal = ""
    videoGame.platforms.forEach((platform, i) => {
      if (i === videoGame.platforms.length - 1) {
        platformFinal = platformFinal + " " + platform
        return;
      }
      platform = platform + `  ${platform} -`
    });
    videoGame.platforms = platformFinal
    videoGame.Generos = strFinal
      res.send(videoGame)
    }
  } catch (error) {
    res.status(404).json("videojuego no encotrado")
  }
})

module.exports = router;
