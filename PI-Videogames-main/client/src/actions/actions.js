import axios from 'axios'


export const getVideogames = () => {
   return async(dispatch) => {
       try {
           const response = await axios.get('localhost:3001/videogames');
           dispatch({
               type: 'GET_VIDEOGAMES',
               payload: response.data
           });
       } catch (error) {
           console.error('Error al recuperar videogames:', error);
       }
   };
};

export const getGenders = () => {
   return async(dispatch) => {
       try {
           const response = await axios.get('localhost:3001/genres');
           dispatch({
               type: 'GET_GENDERS',
               payload: response.data
           });
       } catch (error) {
           console.error('Error al recuperar genres:', error);
       }
   };
};

export const filterByGender = (payload) => {
    return {
        type: 'FILTER_BY_GENDER',
        payload
    }
}

export const filterByRating = (payload) => {
   return {
      type: 'FILTER_BY_RATING',
      payload
   }
} 

export const sortByName = (payload) => {
   return {
      type: 'SORT_BY_NAME',
      payload
   }
}

export const getByName = (name) => {
   return async(dispatch) => {
      try {
         const json = await axios.get(`localhost:3001/games?name=${name}`)
         return dispatch({
            type: 'GET_BY_NAME',
            payload: json.data
         })
      } catch(err) {
         console.log(err)
      }
   }
}

export const filterNew = (payload) => {
   return {
      type: 'FILTER_NEW',
      payload
   }
}

export const getById = (id) => {
   // console.log(id)
   return async(dispatch) => {
      try {
         const json = await axios.get(`localhost:3001/games/${id}`)
         console.log(json.data)
         return dispatch({
            type: 'GET_BY_ID',
            payload: json.data
         })
      } catch (err) {
         console.log(err)
      }
   }
}

export const filterApiDb = (payload) => {
   return {
      type: 'FILTER_API_DB',
      payload
   }
}

export const postVideogame = (payload) => {
   return async (dispatch) => {
      try {
         // console.log(payload)
         const json = await axios.post('localhost:3001/games', payload)
         // console.log(json.data)
         return dispatch({
            type: 'POST_VIDEOGAME',
            payload: json.data
         })
      } catch(err) {
         console.log(err)
      }
   }
}


export const getPlatforms = () => {
   return async(dispatch) => {
       try {
           const response = await axios.get('localhost:3001/platforms?');
           dispatch({
               type: 'GET_PLATFORMS',
               payload: response.data
           });
       } catch (error) {
           console.error('Error al recuperar platforms:', error);
       }
   };
};