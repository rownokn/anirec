import React from 'react'
import AnimeData from '../AnimeData'


const OtherUserAnime = ({anime_id, recommendation}) => {
  return (
    <div >
      <AnimeData animeData={recommendation.slice(0,4)} style='content-list' />
    </div>
  )
}

export default OtherUserAnime