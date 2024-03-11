const { Router } = require("express");
const { Videogame, Gender, Platform } = require("../db");
const router = Router();
const axios = require('axios');
const { getDbInfo, getAllInfo, getApiInfo, getId } = require('../controllers/gameController');
const { SUCCESS, CREATED, BAD_REQUEST, NOT_FOUND } = require('../controllers/status');

router.get('/', async(req, res) => {
   // localhost:3001/videogames?name=grand
   const { name } = req.query; //name = grand
   try {
      let total = await getAllInfo();

      // let total2 = total.map(e => typeof e.id === 'string' ? total.concat(e) : e)
        
      // console.log(total)
      if(name) {
         let found = await total.filter(
               f => f.name.toLowerCase().includes(name.toLowerCase())
         )
         console.log(found)
         found.length ? 
         res.status(SUCCESS).send(found) : 
         res.status(NOT_FOUND).send('Game not found...');
      } else {
         // console.log(total.length)
         res.status(SUCCESS).send(total.flat());
      }
   } catch(err) {
      console.log(err);
      res.status(NOT_FOUND).send('Game not found...')
   }
})

router.get('/:id', async(req, res) => {
   const { id } = req.params
   try { 
      const allIds = await getId(id);
      console.log('allIds ruta', allIds)
      allIds ? res.status(SUCCESS).send(allIds) : res.status(NOT_FOUND).send('Game not found...')

   } catch(err) {
      console.log(err)
      res.status(NOT_FOUND).send('Game not found...')
   }
})

router.post('/', async(req, res) => {
   try {
      let {
         name,
         description,
         platforms,
         released,
         rating,
         image,
         genders
      } = req.body;
      
      if(!image) {
         try {
            image = 'https://static.vecteezy.com/system/resources/previews/003/561/078/large_2x/silhouette-of-mysterious-man-free-photo.jpg'
         } catch(err) {
            console.log(err)
         }
      }
      
            // console.log(
            //    name,
            //    description,
            //    platforms,
            //    released,
            //    rating,
            //    image,
            //    genders
            // )
      
      const createdVideogame = await Videogame.create({
         name: name,
         description: description,
         released: released,
         rating: rating,
         image: image
      })

      // gender.map(async e => {
      //    const found = await Gender.findAll({
      //       where: {name: e}
      //    })
      //    createdVideogame.addGenre(found)
      // })
      console.log(genders)
      genders.forEach(async e => {
         const found = await Gender.findAll({
            where: {name: e}
         })
         // console.log(found)
         createdVideogame.addGender(found)
      })
      console.log(platforms)
      platforms.forEach(async e => {
         // console.log(e)
         const found = await Platform.findAll({
            where: {name: e}
         })  
         createdVideogame.addPlatform(found) 
         // console.log(found)
      })
      // console.log(createdVideogame);
      res.status(CREATED).send(createdVideogame);    
   } catch (err) {
      console.log(err)
      res.status(BAD_REQUEST).send('Data needed is missing...')  
   }

})

module.exports = router