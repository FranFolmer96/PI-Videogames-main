import axios from 'axios'


export const getVideogames = () => {
    return async(dispatch) => {
        let json = await axios.get('https://api.rawg.io/api/videogames')
         // console.log(typeof json.data)
         // console.log(json.data)

        return dispatch({
            type: 'GET_VIDEOGAMES',
            payload: json.data
        })

    }  
}

export const getGenders = () => {
 
    return async(dispatch) => {

        let json = await axios.get('https://api.rawg.io/api/genders')
      //   console.log(json.data)
        return dispatch({
            type: 'GET_GENDERS',
            payload: json.data
        })
    }
}

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
         const json = await axios.get(`https://api.rawg.io/api/videogames?name=${name}`)
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
         const json = await axios.get(`https://api.rawg.io/api/videogames/${id}`)
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
         const json = await axios.post('https://api.rawg.io/api/videogames', payload)
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
       let json = await axios.get('https://api.rawg.io/api/platforms')
       return dispatch({
           type: 'GET_PLATFORMS',
           payload: json.data
       })
   }
}