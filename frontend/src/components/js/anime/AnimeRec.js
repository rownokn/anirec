import React from 'react'
import {Link} from 'react-router-dom'


const AnimeRec = ({animeRec}) => {
  return (

    <div className='content-list'>
      {animeRec.map(rec =>
      <Link to={`/anime-profile/${rec.id}/anime-summary`} target="_blank">
         <div>
          <img src={rec.image} alt='inu' />
          <p>{rec.name}</p>
        </div>
      </Link>
        
        )}
  </div>
  )
}

export default AnimeRec