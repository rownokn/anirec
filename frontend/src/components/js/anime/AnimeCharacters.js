import React, {useState, useEffect} from 'react'
import AnimeCharacterSummary from './AnimeCharacterSummary'

const AnimeCharacters = ({anime_id}) => {


  return (
    <div className='anime-summary'>
      <h2>Characters</h2> 

      <AnimeCharacterSummary anime_id={anime_id} />  
    </div>
  )
}

export default AnimeCharacters