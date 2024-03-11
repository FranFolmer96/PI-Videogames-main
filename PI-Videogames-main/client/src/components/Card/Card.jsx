/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import './Card.css'

function Card({name, image, genders, id, rating, createdInDb}) {
   // console.log(genders) 
   let genders2 = genders.map(e => e.name ? e.name : e)
  //  console.log(genders2)
   // let genders2 = genders.map(e => typeof e === 'string' ? e : e.name)
   return (
    <div className="cardContainer">
      <div className="cardContainer2">
       <p className="ratingCard">{rating}</p>
      <img className="cardImage" src={image}  />
      <div className="gendersTitle">
        <div className="cardGenders">
          <p> {genders2.join(', ')}</p> 
        </div>
        <h3 className="CardTitle">{name}</h3>
      </div>
      </div>
      </div>
   )
}  

export default Card