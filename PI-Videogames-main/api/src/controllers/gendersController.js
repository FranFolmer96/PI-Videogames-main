const axios = require('axios');
const { API_KEY } = process.env
const { Videogame, Gender } = require('../db');

const getAllGenders = async() => {
   const allGenders = (await axios.get(`https://api.rawg.io/api/genders?key=${API_KEY}`)).data;
   const genders = allGenders.results?.map(e => e.name ? e.name : 'no data')
   
   genders.forEach(e => {
      if(e) {
        Gender.findOrCreate({
            where: {
               id: e.id,
               name: e.name
            }
         })       
      }
   })
   const gender = await Gender.findAll();
   return gender;
}


module.exports = {
   getAllGenders
}