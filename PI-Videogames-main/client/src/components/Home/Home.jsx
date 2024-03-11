/* eslint-disable no-unused-vars */
import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames, filterByGender, getGenders, filterByRating, sortByName, getById, filterNew, filterApiDb } from '../../actions/actions';
import { Link } from 'react-router-dom'
import Card from '../Card/Card';
import Page from '../Page/Page';
import SearchBar from '../SearchBar/SearchBar';
import './Home.css'
function Home() {

   const [gamesPerPage, setGamesPerPage] = useState(15)
   const [currentPage, setCurrentPage] = useState(1)
   const [order, setOrder] = useState('')
   const genders = useSelector(state => state.genders)
   const dispatch = useDispatch()
   const allVideogames = useSelector(state => state.videogames)
   const indexOfLastGame = currentPage * gamesPerPage
   const indexOfFirstGame = indexOfLastGame - gamesPerPage
   const currentGames = allVideogames.slice(indexOfFirstGame, indexOfLastGame)
   
   
   useEffect(() => {
      dispatch(getVideogames())
   }, [dispatch])
   
   useEffect(() => {
      dispatch(getGenders())
   }, [dispatch])
   
   const page = (pageNum) => {
      // console.log(pageNum)
         setCurrentPage(pageNum)
      
   }

   const handleClick = (e) => {
      e.preventDefault()
      dispatch(getVideogames())
   }

   const handleSortByName = (e) => {
      e.preventDefault()
      dispatch(sortByName(e.target.value))
      setCurrentPage(1)
      setOrder(`Order ${e.target.value}`)
   }

   const handleSortByRating = (e) => {
      e.preventDefault()
      dispatch(filterByRating(e.target.value))
      setCurrentPage(1)
      setOrder(`Order ${e.target.value}`)
   }

   const handleFilterByGender = (e) => {
      e.preventDefault()
      dispatch(filterByGender(e.target.value))
      setCurrentPage(1)
      setOrder(`Order ${e.target.value}`)
   }

   const handleFilterApiDb = (e) => {
      e.preventDefault()
      dispatch(filterApiDb(e.target.value))
      setCurrentPage(1)
      setOrder(`Order ${e.target.value}`)
      
   }

   const handleClickNew = (e) => {
      e.preventDefault()
      dispatch(filterNew(e))
      setCurrentPage(1)
   }

return (

   <div className='containerHome'>
         <h1 className='tilte' >GAMING ZONE</h1>
      <div className='headerContainer'>
         <Link to='/form'><button className='createButton'>Crear Juego</button></Link>
         <button className='rechargeButton' onClick={e => {handleClick(e)}}>Recargar</button>
         <button className='filterNew' onClick={e => handleClickNew(e)}>Filtar</button>
      </div>
 
{/* /////////   FILTROS   /////////////// */}

         <div className='allSelects'>
            <div>
               <select className='select' onChange={e => handleSortByName(e)}>
                  <option value="-">-</option>
                  <option value="A-Z">A-Z</option>
                  <option value="Z-A">Z-A</option>
               </select>
               <select className='select' onChange={e => handleSortByRating(e)}>
                  <option value="-">-</option>
                  <option value="higher">Higher</option>
                  <option value="lower">Lower</option>
               </select>
               <select className='select' onChange={e => handleFilterApiDb(e)}>
                  <option value="all">All</option>
                  <option value="db">Data Base</option>
                  <option value="api">Api</option>
               </select>            
               <select className='select'  onChange={e => handleFilterByGender(e)}>
                  <option value="All">All</option>
               {
                  genders.map(g => (
                     <option key={g.id} value={g.name}>{g.name}</option>
                     ))
               }
               </select>
            </div>
            <SearchBar setCurrentPage={setCurrentPage}/>
         </div>


{/*
/////////   CARDS   /////////////// */}
  
   <div className='cards'>
         {
            currentGames?.map(e => {
               // console.log(e.genders)
               // console.log(currentGames)
               return (

                     <Link key={e.id} to={`/videogames/${e.id}`}>
                        <Card
                           
                           name={e.name} 
                           image={e.image} 
                           genders={e.genders} 
                           rating={e.rating}
                        />
                     </Link>   

               )
            })
         }
   
   </div>


   {/* /////////   PAGINADO   /////////////// */}

 
   <div className='page'>
   
            <Page 
            gamesPerPage={gamesPerPage} 
            allVideogames={allVideogames.length} 
            page={page}
            />
         </div>

</div>

   )
}

export default Home