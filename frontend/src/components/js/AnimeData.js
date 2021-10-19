import React from 'react'
import {Link} from 'react-router-dom'


const AnimeData = ({animeData, style, setShow}) => {
  return (
    <div class={style}>
        {animeData.map((anime) => 
          <Link to={`/anime-profile/${anime.id}/anime-summary`} onClick={setShow}>
            <div>
              <img src={anime.image} alt='anime_cover' />
              <p className='title'>{anime.eng_title ? anime.eng_title : anime.title}</p>
            </div>

          </Link>
            
          )} 
      </div>
  )
}

export default AnimeData