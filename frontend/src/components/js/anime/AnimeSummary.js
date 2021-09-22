import React, {useState} from 'react'
import { useParams } from 'react-router-dom';
import OtherUserAnime from './OtherUserAnime';
import AnimeCharacterSummary from './AnimeCharacterSummary';

const AnimeSummary = ({animeInfo, anime_id}) => {

  
  return (
    <div>
        <div className='anime-summary'>
          <h1>{animeInfo.name}</h1>
        {animeInfo.summary}
        </div>
        <div className='anime-character'>
          <h2>Characters</h2> 
          <div className='content-list'>
        {animeInfo.character.map (char => 
          <div>
            <img src={char.image} alt='inu' />
           <p>{char.name}</p>
          </div>
        )}

      
      </div>         

        </div>
        <div className='anime-recommendation'>
          <h2>Recommendation</h2>
          <OtherUserAnime anime_id={anime_id} />
        </div>


    </div>

  )
}

export default AnimeSummary