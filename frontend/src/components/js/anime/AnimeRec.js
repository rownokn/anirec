import React from 'react'

const AnimeRec = ({animeRec}) => {
  return (
    <div className='content-list'>
      {animeRec.map(rec =>
         <div>
         <img src={rec.image} alt='inu' />
         <p>{rec.name}</p>
       </div>
        )}
  </div>
  )
}

export default AnimeRec