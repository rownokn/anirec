import React from 'react'
import UserAnimeDisplay from './UserAnimeDisplay'

const AnimeRecommendations = ({anime_id}) => {
  return (
    <div className='anime-summary'>
      <UserAnimeDisplay anime_id={anime_id} />
    </div>
  )
}

export default AnimeRecommendations