import React from 'react'
import OtherUserAnime from './OtherUserAnime';
import {Link, useRouteMatch} from 'react-router-dom'

const AnimeSummary = ({animeInfo, anime_id}) => {
  let { url } = useRouteMatch();

  
  return (
    <div>
        <div className='anime-summary'>
          <h1>{animeInfo.name}</h1>
          <p  dangerouslySetInnerHTML={{__html: animeInfo.summary}} />
        </div>
        <div className='anime-character'>
          <h2>Characters</h2> 
          <div className='content-list'>
        {animeInfo.character.map (char => 
          <Link to={`${url}/character-profile/${char.id}`}>
              <div>
              <img src={char.image} alt='inu' />
              <p>{char.name}</p>
            </div>
          </Link>
         
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