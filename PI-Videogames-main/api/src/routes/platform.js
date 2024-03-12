const { Router } = require('express');
const router = Router();
const { Platform, Videogame } = require('../db')
const { SUCCESS, CREATED, BAD_REQUEST, NOT_FOUND } = require('../controllers/status');
const axios = require('axios');
const { API_KEY } = process.env;

router.get('/', async(_req, res) => {
    // try {
    //     const gender = await getAllGenders()
    //     res.status(SUCCESS).send(gender);
    // } catch(err) {
    //     console.log(err)
    //     res.status(NOT_FOUND).send('Not info')
    // }
   const apiPlatform = (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)).data.results
   try {
      let platforms = apiPlatform.map(p => p.platforms ? p.platforms : 'no Data')
      let platform = platforms.flat().map(p => p.platform ? p.platform.name : 'no data')
      platform.forEach(e => {
         if(e) {
            Platform.findOrCreate({
               where: {name: e}
            })
         }
      });
      platform = await Platform.findAll()
      res.status(SUCCESS).send(platform)
   } catch (error) {
      console.log(error)     
      res.status(NOT_FOUND).send('Not found')   
   }
})

module.exports = router