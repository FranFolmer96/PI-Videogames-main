const { Router } = require("express");
const { Videogame, Gender, Platform } = require("../db");
const router = Router();
const axios = require('axios');
const { getDbInfo, getAllInfo, getApiInfo, getId } = require('../controllers/gameController');
const { SUCCESS, CREATED, BAD_REQUEST, NOT_FOUND } = require('../controllers/status');

router.get('/', async(req, res) => {
   
   const { name } = req.query; 
   try {
      let total = await getAllInfo();

     
      if(name) {
         let found = await total.filter(
               f => f.name.toLowerCase().includes(name.toLowerCase())
         )
         console.log(found)
         found.length ? 
         res.status(SUCCESS).send(found) : 
         res.status(NOT_FOUND).send('Game not found...');
      } else {
         
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
            image = 'https://cdn.vox-cdn.com/thumbor/q9CNivwPskHOm9NTuAZbreyQHzc=/0x0:1531x861/920x613/filters:focal(644x309:888x553):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/55584747/maxresdefault.0.jpg'
         } catch(err) {
            console.log(err)
         }
      }
      
      
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
      //    createdVideogame.addGender(found)
      // })
      console.log(genders)
      genders.forEach(async e => {
         const found = await Gender.findAll({
            where: {name: e}
         })
         
         createdVideogame.addGender(found)
      })
      console.log(platforms)
      platforms.forEach(async e => {
         
         const found = await Platform.findAll({
            where: {name: e}
         })  
         createdVideogame.addPlatform(found) 
         
      })
      
      res.status(CREATED).send(createdVideogame);    
   } catch (err) {
      console.log(err)
      res.status(BAD_REQUEST).send('Data needed is missing...')  
   }

})

module.exports = router