import React from 'react'
import OtherUserAnime from './OtherUserAnime';
import {Link, useRouteMatch} from 'react-router-dom'
import loading_gif from '../../images/13335.gif'

const AnimeSummary = ({animeInfo, anime_id, recommendation}) => {
  let { url } = useRouteMatch();  
  return (
    <div className='summary'>
        <div className='anime-summary'>
          <h1>{animeInfo.eng_title ? (animeInfo.eng_title !== animeInfo.name ? animeInfo.eng_title + ' (' + animeInfo.name + ')' : animeInfo.name) :  animeInfo.name}</h1>
          <p  dangerouslySetInnerHTML={{__html: animeInfo.summary}} />
        </div>
        <div className='anime-character'>
          <h2>Characters</h2> 
          <div className='content-list'>
        {animeInfo.character.length > 0 ? animeInfo.character.map (char => 
          <Link key={char.id} to={`${url}/character-profile/${char.id}`}>
              <div>
              <img src={char.image} alt='inu' />
              <p>{char.name}</p>
            </div>
          </Link>
         
        ): <div><img src={loading_gif} alt='loading' /> <h3>No Characters</h3></div>}

      
      </div>         

        </div>
        <div className='anime-recommendation'>
          <h2>Recommendation</h2>
          {recommendation.length > 0 ? <OtherUserAnime anime_id={anime_id} recommendation={recommendation} /> : <div><img src={loading_gif} width='150' height='147' alt='loading' /> <h3>No Recommendations</h3></div>}
        </div>


    </div>

  )
}

export default AnimeSummary