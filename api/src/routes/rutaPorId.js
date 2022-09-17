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
      // console.log(busquefaDB.dataValues.Generos.map(el => el.name));
      const videoGame = {
        name : busquefaDB.dataValues.name,
        description : busquefaDB.dataValues.description,
        img :  busquefaDB.dataValues.img,
        rating :  busquefaDB.dataValues.rating,
        released:  busquefaDB.dataValues.released,
        Generos : busquefaDB.dataValues.Generos.map(el => el.name),
        platforms : busquefaDB.dataValues.platforms
      }
      let a = ""
    videoGame.Generos.forEach((el, i) => {
      if (i === videoGame.Generos.length - 1) {
        a = a + " " + el
        return;
      }
      a = a + ` ${el} -`
    });
    let platform = ""
    videoGame.platforms.forEach((el, i) => {
      if (i === videoGame.platforms.length - 1) {
        platform = platform + " " + el
        return;
      }
      platform = platform + `  ${el} -`
    });
    videoGame.platforms = platform
    videoGame.Generos = a
      res.send(videoGame)
    }
  } catch (error) {
    console.log(error)
    res.status(404).json("videojuego no encotrado")
  }
})

module.exports = router;
